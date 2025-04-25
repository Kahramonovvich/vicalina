'use client'
import { Modal, TextField, Button, MenuItem, Checkbox, FormControlLabel } from "@mui/material"
import { useState } from "react"
import { navMenu } from "@/constants/constants";
import { useRouter } from "next/navigation";

export default function CreateProductModal({ openModal, setOpenModal }) {

    const router = useRouter();

    const [languageId, setLanguageId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
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

    const handleClose = () => {
        setOpenModal(false);
        setForm({
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
        setLanguageId(1);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                for (const item of value) {
                    formData.append(key, item);
                }
            } else if (key === "Images") {
                for (const img of value) {
                    formData.append("Files", img);
                }
            } else if (key !== "Category") {
                formData.append(key, value);
            }
        });

        const selectedCategory = navMenu.find(cat => String(cat.id) === String(form.Category));
        const nameToUse = languageId === 1 ? selectedCategory?.name : selectedCategory?.nameRu;
        formData.append("Category", nameToUse);

        try {
            setIsLoading(true);
            const res = await fetch('api/Products/CreateProduct', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                setLanguageId(2);
                alert("Mahsulot qo'shildi");
                setForm({
                    ...form,
                    LanguageId: 2,
                    Name: '',
                    Description: '',
                    ShortDescription: '',
                    Type: '',
                    Color: [],
                    Tags: [],
                });
                if (languageId === 2) {
                    router.refresh();
                    handleClose();
                };
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
                        <p className="text-lg font-semibold">Mahsulot yaratish</p>
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
                            value={form.Tags.join(',')}
                            onChange={(e) => setForm({ ...form, Tags: e.target.value.split(',') })}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Rangi"
                            name="Color"
                            value={form.Color.join(',')}
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
                            required
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