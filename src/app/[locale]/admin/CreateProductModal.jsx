'use client';
import {
    Modal,
    TextField,
    Button,
    MenuItem,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { navMenu } from "@/constants/constants";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

export default function CreateProductModal({ openModal, setOpenModal, token }) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        price: '',
        newPrice: '',
        category: '',
        type: '',
        quantity: '',
        sku: '',
        discount: false,
        weight: '',
        color: '',
        availabilityCount: '',
        tags: '',
        files: [],
        translations: {
            uz: {
                name: '',
                description: '',
                shortDescription: '',
            },
            ru: {
                name: '',
                description: '',
                shortDescription: '',
            },
            en: {
                name: '',
                description: '',
                shortDescription: '',
            },
        },
    });

    const handleClose = () => {
        if (isLoading) return;

        setOpenModal(false);

        setForm({
            price: '',
            newPrice: '',
            category: '',
            type: '',
            quantity: '',
            sku: '',
            discount: false,
            weight: '',
            color: '',
            availabilityCount: '',
            tags: '',
            files: [],
            translations: {
                uz: {
                    name: '',
                    description: '',
                    shortDescription: '',
                },
                ru: {
                    name: '',
                    description: '',
                    shortDescription: '',
                },
                en: {
                    name: '',
                    description: '',
                    shortDescription: '',
                },
            },
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            setForm((prev) => ({
                ...prev,
                [name]: checked,
            }));
            return;
        };

        if (type === 'file') {
            setForm((prev) => ({
                ...prev,
                files: Array.from(files),
            }));
            return;
        };

        if (name === 'quantity') {
            setForm((prev) => ({
                ...prev,
                quantity: value,
                availabilityCount: value,
            }));
            return;
        };

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTranslationChange = (lang, field, value) => {
        setForm((prev) => ({
            ...prev,
            translations: {
                ...prev.translations,
                [lang]: {
                    ...prev.translations[lang],
                    [field]: value,
                },
            },
        }));
    };

    const compressImages = async (files) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        const compressedFiles = [];

        for (const file of files) {
            const compressed = await imageCompression(file, options);
            compressedFiles.push(compressed);
        }

        return compressedFiles;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const formData = new FormData();

            formData.append('Price', form.price);
            formData.append('NewPrice', form.discount ? form.newPrice : 0);
            formData.append('Category', navMenu.find((item) => String(item.id) === String(form.category))?.name || '');
            formData.append('Type', form.type);
            formData.append('Quantity', form.quantity);
            formData.append('Sku', form.sku);
            formData.append('discount', form.discount);
            formData.append('Weight', form.weight);
            formData.append('AvailabilityCount', form.availabilityCount);

            form.color
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
                .forEach((item) => {
                    formData.append('Color', item);
                });

            form.tags
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
                .forEach((item) => {
                    formData.append('Tags', item);
                });

            const translations = [
                {
                    language: 'uzb',
                    name: form.translations.uz.name,
                    description: form.translations.uz.description,
                    shortDescription: form.translations.uz.shortDescription,
                },
                {
                    language: 'ru',
                    name: form.translations.ru.name,
                    description: form.translations.ru.description,
                    shortDescription: form.translations.ru.shortDescription,
                },
                {
                    language: 'en',
                    name: form.translations.en.name,
                    description: form.translations.en.description,
                    shortDescription: form.translations.en.shortDescription,
                },
            ];

            formData.append('Translations', JSON.stringify(translations));

            const compressedImages = await compressImages(form.files);

            compressedImages.forEach((file, index) => {
                const ext = file.type.split('/')[1];
                const filename = `image_${index}_${Date.now()}.${ext}`;

                const renamedFile = new File([file], filename, {
                    type: file.type,
                });

                formData.append('Files', renamedFile);
            });

            const res = await fetch('/api/Products/CreateProduct', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Mahsulot yaratilmadi');
            }

            router.refresh();
            alert("Mahsulot yaratildi. Очередная победа над хаосом Swagger.");
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Xatolik yuz berdi');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            className="flex items-center justify-center"
        >
            <div className="w-11/12 max-w-6xl bg-white p-6 rounded-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-6">Mahsulot yaratish</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                        label="Narxi"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Yangi narxi"
                        name="newPrice"
                        type="number"
                        value={form.newPrice}
                        onChange={handleChange}
                        disabled={!form.discount}
                        required={form.discount}
                    />

                    <TextField
                        select
                        label="Kategoriya"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                    >
                        {navMenu.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Turi"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Soni"
                        name="quantity"
                        type="number"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="SKU"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Og'irligi"
                        name="weight"
                        type="number"
                        value={form.weight}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Ranglar"
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                        placeholder="red, blue, black"
                        required
                    />

                    <TextField
                        label="Teglar"
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="new, sale, popular"
                        required
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.discount}
                                onChange={handleChange}
                                name="discount"
                            />
                        }
                        label="Chegirma bormi?"
                    />

                    <div className="md:col-span-2 border-t pt-4">
                        <h3 className="text-lg font-semibold mb-4">O'zbekcha</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <TextField
                                label="Nomi"
                                value={form.translations.uz.name}
                                onChange={(e) => handleTranslationChange('uz', 'name', e.target.value)}
                                required
                            />

                            <TextField
                                label="Tavsif"
                                value={form.translations.uz.description}
                                onChange={(e) => handleTranslationChange('uz', 'description', e.target.value)}
                                required
                            />

                            <TextField
                                label="Qisqacha tavsif"
                                value={form.translations.uz.shortDescription}
                                onChange={(e) => handleTranslationChange('uz', 'shortDescription', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 border-t pt-4">
                        <h3 className="text-lg font-semibold mb-4">Русский</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <TextField
                                label="Название"
                                value={form.translations.ru.name}
                                onChange={(e) => handleTranslationChange('ru', 'name', e.target.value)}
                                required
                            />

                            <TextField
                                label="Описание"
                                value={form.translations.ru.description}
                                onChange={(e) => handleTranslationChange('ru', 'description', e.target.value)}
                                required
                            />

                            <TextField
                                label="Краткое описание"
                                value={form.translations.ru.shortDescription}
                                onChange={(e) => handleTranslationChange('ru', 'shortDescription', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 border-t pt-4">
                        <h3 className="text-lg font-semibold mb-4">English</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <TextField
                                label="Name"
                                value={form.translations.en.name}
                                onChange={(e) => handleTranslationChange('en', 'name', e.target.value)}
                                required
                            />

                            <TextField
                                label="Description"
                                value={form.translations.en.description}
                                onChange={(e) => handleTranslationChange('en', 'description', e.target.value)}
                                required
                            />

                            <TextField
                                label="Short description"
                                value={form.translations.en.shortDescription}
                                onChange={(e) => handleTranslationChange('en', 'shortDescription', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <input
                            type="file"
                            multiple
                            onChange={handleChange}
                            name="Images"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Yaratilmoqda...' : 'Yaratish'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};