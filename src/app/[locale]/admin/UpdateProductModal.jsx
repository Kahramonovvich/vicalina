'use client'
import { Modal, TextField, Button, MenuItem, Checkbox, FormControlLabel } from "@mui/material"
import { useEffect, useState } from "react"
import { navMenu } from "@/constants/constants";
import { useRouter } from "next/navigation";
import imageCompression from 'browser-image-compression';

export default function UpdateProductModal({ openModal, setOpenModal, languageId, product }) {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        Id: product.id,
        LanguageId: languageId,
        Name: product.name,
        Description: product.description,
        ShortDescription: product.shortDescription,
        Price: product.price,
        NewPrice: product.newPrice,
        Category: product.category,
        Type: product.type,
        Quantity: product.quantity,
        Sku: product.sku,
        discount: product.discount,
        Weight: product.weight,
        Color: product.color,
        AvailabilityCount: product.availabilityCount,
        Tags: product.tags,
        Images: [],
    });

    const handleClose = () => {

        if (isLoading) {
            return;
        };

        setOpenModal(false);
        setForm({
            Id: '',
            LanguageId: languageId,
            Name: '',
            Description: '',
            ShortDescription: '',
            Price: '',
            NewPrice: 0,
            Category: '',
            Type: '',
            Quantity: '',
            Sku: '',
            discount: false,
            Weight: '',
            Color: [],
            AvailabilityCount: '',
            Tags: [],
            Images: [],
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setForm({ ...form, [name]: checked });
        } else if (type === "file") {
            setForm({ ...form, Images: files });
        } else if (name === "Quantity") {
            setForm(prev => ({
                ...prev,
                Quantity: value,
                AvailabilityCount: value,
            }));
        } else {
            setForm({ ...form, [name]: value });
        };
    };

    const compressImages = async (files) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

        const compressedFiles = [];

        for (const file of files) {
            const compressed = await imageCompression(file, options);
            compressedFiles.push(compressed);
        };

        return compressedFiles;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                for (const item of value) {
                    formData.append(key, item);
                }
            } else if (key !== "Category" && key !== "Images") {
                formData.append(key, value);
            };
        });

        const selectedCategory = navMenu.find(cat => String(cat.id) === String(form.Category));
        const nameToUse = languageId === 1 ? selectedCategory?.name : selectedCategory?.nameRu;
        formData.append("Category", nameToUse);

        const compressedImages = await compressImages(form.Images);
        compressedImages?.forEach((file, index) => {
            const ext = file.type.split('/')[1];
            const filename = `image_${index}_${Date.now()}.${ext}`;
            const renamedFile = new File([file], filename, { type: file.type });

            formData.append('Files', renamedFile);
        });

        try {
            const res = await fetch('api/Products/UpdateProduct', {
                method: 'PUT',
                body: formData,
            });
            if (res.ok) {
                alert("Mahsulot yangilandi");
                handleClose();
                router.refresh();
            } else {
                alert('Xatolik');
                console.error('Xatolik:', res);
            }
        } catch (err) {
            console.error(err);
            alert('Xatolik!');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const selectedCategory = navMenu.find(cat => cat.name === product.category || cat.nameRu === product.category);
        setForm({
            Id: product.id,
            LanguageId: languageId,
            Name: product.name,
            Description: product.description,
            ShortDescription: product.shortDescription,
            Price: product.price,
            NewPrice: product.newPrice,
            Category: selectedCategory?.id,
            Type: product.type,
            Quantity: product.quantity,
            Sku: product.sku,
            discount: product.discount,
            Weight: product.weight,
            Color: product.color,
            AvailabilityCount: product.availabilityCount,
            Tags: product.tags,
            Images: [],
        });
    }, [product]);

    return (
        <div className="createProduct">
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex items-center justify-center"
            >
                <div className="box w-3/4 bg-white p-4 rounded-lg max-h-[90vh] overflow-y-auto">
                    <div className="box mb-3 flex items-center justify-between">
                        <p className="text-lg font-semibold">Mahsulot yangilash</p>
                        <p className="text-lg font-semibold"><span className='text-red-500'>{languageId === 1 ? 'O`zbek' : 'Rus'}</span> tilida to'ldiring!</p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="Nomi"
                            name="Name"
                            value={form.Name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Tavsif"
                            name="Description"
                            value={form.Description}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            maxRows={10}
                        />
                        <TextField
                            label="Qisqacha tavsif"
                            name="ShortDescription"
                            value={form.ShortDescription}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Narxi"
                            name="Price"
                            type="number"
                            value={form.Price}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={languageId === 2}
                        />
                        <TextField
                            label="Yangi narxi"
                            name="NewPrice"
                            type="number"
                            value={form.NewPrice}
                            onChange={handleChange}
                            fullWidth
                            required={form.discount}
                            disabled={!form.discount || languageId === 2}
                        />
                        <TextField
                            label="Turi"
                            name="Type"
                            value={form.Type}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Ombordagi soni"
                            name="Quantity"
                            type="number"
                            value={form.Quantity}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={languageId === 2}
                        />
                        <TextField
                            label="SKU"
                            name="Sku"
                            value={form.Sku}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={languageId === 2}
                        />
                        <TextField
                            label="Og'irligi"
                            name="Weight"
                            type="number"
                            value={form.Weight}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            select
                            label="Kategoriya"
                            name="Category"
                            value={form.Category}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={languageId === 2}
                        >
                            {navMenu.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Teglar (vergul bilan ajratilgan)"
                            name="Tags"
                            value={form.Tags?.join(',')}
                            onChange={(e) => setForm({ ...form, Tags: e.target.value.split(',') })}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Rangi"
                            name="Color"
                            value={form.Color?.join(',')}
                            onChange={(e) => setForm({ ...form, Color: e.target.value.split(',') })}
                            fullWidth
                            required
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={form.discount}
                                    onChange={handleChange}
                                    name="discount"
                                    disabled={languageId === 2}
                                />
                            }
                            label="Chegirma bormi?"
                        />
                        <input
                            type="file"
                            name="Images"
                            multiple
                            onChange={handleChange}
                            max={4}
                            disabled={languageId === 2}
                        />
                        <div className="md:col-span-2 flex justify-end mt-4">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Yaratilmoqda' : 'Yaratish'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};