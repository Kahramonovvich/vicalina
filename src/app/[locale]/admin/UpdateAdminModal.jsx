'use client';

import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdateAdminModal({ open, onClose, login, token }) {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const updateAdmin = async () => {
        const formData = new FormData();
        formData.append('Login', login);
        formData.append('OldPassword', oldPassword);
        formData.append('NewPassword', newPassword);
        setIsLoading(true);
        const res = await fetch('/api/Admin/UpdateAdmin', {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await res.json();

        if (res.ok && result === true) {
            alert('Админ успешно обновлён');
            setOldPassword('');
            setNewPassword('');
            setIsLoading(false);
            router.refresh();
            onClose();
        } else {
            alert(result?.error || 'Не удалось обновить админа');
            setIsLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    width: 400,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Adminni yangilash
                </Typography>
                <TextField
                    fullWidth
                    label="Логин"
                    value={login}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Старый пароль"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    margin="normal"
                />
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button disabled={isLoading} variant="contained" color="primary" onClick={updateAdmin}>
                        {isLoading ? 'Yangilanmoqda...' : 'Yangilash'}
                    </Button>
                    <Button disabled={isLoading} variant="outlined" onClick={onClose}>
                        Bekor qilish
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};