'use client'
import { Modal, TextField, Button, MenuItem, Checkbox, FormControlLabel } from "@mui/material"
import { useEffect, useState } from "react"
import { navMenu } from "@/constants/constants";
import { useRouter } from "next/navigation";
import imageCompression from 'browser-image-compression';

async function formDataToObjectWithFiles(formData) {
    const obj = {};
    const filesMap = {};

    for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
            if (!filesMap[key]) {
                filesMap[key] = [];
            };

            const base64 = await fileToBase64(value);
            filesMap[key].push({
                name: value.name,
                type: value.type,
                size: value.size,
                data: base64
            });
        } else {
            if (obj[key]) {
                if (!Array.isArray(obj[key])) {
                    obj[key] = [obj[key]];
                }
                obj[key].push(value);
            } else {
                obj[key] = value;
            };
        };
    };

    Object.assign(obj, filesMap);
    return obj;
};

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

function base64ToFile(base64, filename, type) {
    const arr = base64.split(',');
    const mime = type || arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    };
    return new File([u8arr], filename, { type: mime });
};

export default function CreateProductModal({ openModal, setOpenModal, token }) {

    const router = useRouter();

    const [languageId, setLanguageId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const [form, setForm] = useState({
        LanguageId: 1,
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

        if (isLoading || languageId === 2 && !isClose) {
            return;
        };

        setOpenModal(false);
        setForm({
            LanguageId: 1,
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
        setIsClose(false);
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
        compressedImages.forEach((file, index) => {
            const ext = file.type.split('/')[1];
            const filename = `image_${index}_${Date.now()}.${ext}`;
            const renamedFile = new File([file], filename, { type: file.type });
            formData.append('Files', renamedFile);
        });

        if (languageId === 1) {
            try {
                const obj = await formDataToObjectWithFiles(formData);
                localStorage.setItem('uzProduct', JSON.stringify(obj));

                localStorage.setItem('uzNeed', JSON.stringify(true));
                localStorage.setItem('ruNeed', JSON.stringify(true));

                setLanguageId(2);
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
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            };
        } else {
            try {
                const obj = await formDataToObjectWithFiles(formData);
                localStorage.setItem('ruProduct', JSON.stringify(obj));

                const uzProduct = await JSON.parse(localStorage.getItem('uzProduct'));
                const ruProduct = await JSON.parse(localStorage.getItem('ruProduct'));

                const uzNeed = await JSON.parse(localStorage.getItem('uzNeed'));
                const ruNeed = await JSON.parse(localStorage.getItem('ruNeed'));

                if (uzNeed) {
                    const newFormDataUz = new FormData();
                    Object.entries(uzProduct).forEach(([key, value]) => {
                        if (Array.isArray(value) && value[0]?.data && value[0]?.name) {
                            for (const item of value) {
                                const file = base64ToFile(item.data, item.name, item.type);
                                newFormDataUz.append(key, file);
                            };
                        } else {
                            newFormDataUz.append(key, value);
                        };
                    });

                    const res1 = await fetch('api/Products/CreateProduct', {
                        method: 'POST',
                        body: newFormDataUz,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (res1.ok) {
                        localStorage.setItem('uzNeed', JSON.stringify(false));
                        localStorage.setItem('uzTrue', JSON.stringify(true));
                    };
                };

                if (ruNeed) {
                    const newFormDataRu = new FormData();
                    Object.entries(ruProduct).forEach(([key, value]) => {
                        if (Array.isArray(value) && value[0]?.data && value[0]?.name) {
                            for (const item of value) {
                                const file = base64ToFile(item.data, item.name, item.type);
                                newFormDataRu.append(key, file);
                            };
                        } else {
                            newFormDataRu.append(key, value);
                        };
                    });

                    const res2 = await fetch('api/Products/CreateProduct', {
                        method: 'POST',
                        body: newFormDataRu,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (res2.ok) {
                        localStorage.setItem('ruNeed', JSON.stringify(false));
                        localStorage.setItem('ruTrue', JSON.stringify(true));
                    };
                };

                const uzTrue = await JSON.parse(localStorage.getItem('uzTrue'));
                const ruTrue = await JSON.parse(localStorage.getItem('ruTrue'));

                if (uzTrue && ruTrue) {
                    alert("Mahsulot qo'shildi");
                    localStorage.removeItem('ruProduct');
                    localStorage.removeItem('uzProduct');
                    localStorage.removeItem('uzNeed');
                    localStorage.removeItem('ruNeed');
                    localStorage.removeItem('uzTrue');
                    localStorage.removeItem('ruTrue');
                    setIsClose(true);
                    router.refresh();
                } else {
                    if (uzNeed) {
                        alert(`Xatolik: O'zbek tilida muhsulot qo'shilmadi. Iltimos yaratish tugmasini qayta bosing!`);
                        console.error(`Xatolik: O'zbek tilida muhsulot qo'shilmadi. Iltimos yaratish tugmasini qayta bosing!`);
                    };

                    if (ruNeed) {
                        alert(`Xatolik: Rus tilida muhsulot qo'shilmadi. Iltimos yaratish tugmasini qayta bosing!`);
                        console.error(`Xatolik: Rus tilida muhsulot qo'shilmadi. Iltimos yaratish tugmasini qayta bosing!`);
                    };
                };
            } catch (err) {
                console.error(err);
                alert('Xatolik:', err);
            } finally {
                setIsLoading(false);
            };
        };
    };

    useEffect(() => {
        if (languageId === 2) {
            handleClose();
        };
    }, [languageId, isClose]);

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
                            disabled={languageId === 2}
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