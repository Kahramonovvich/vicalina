'use client';
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateAdminModal({ open, onClose, token }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const createAdmin = async () => {
        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        const formData = new FormData();
        formData.append('Login', login);
        formData.append('Password', password);
        formData.append('ConfirmPassword', confirmPassword);

        setIsLoading(true);
        const res = await fetch('/api/Admin/CreateAdmin', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await res.json();

        if (res.ok) {
            alert('Админ успешно создан!');
            setLogin('');
            setPassword('');
            setConfirmPassword('');
            setIsLoading(false);
            router.refresh();
            onClose();
        } else {
            alert(result?.error || 'Ошибка при создании админа');
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
                    Admin yaratish
                </Typography>
                <TextField
                    fullWidth
                    label="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Parol"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Parolni takrorlang"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                />
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button disabled={isLoading} variant="contained" color="primary" onClick={createAdmin}>
                        {!isLoading ? 'Yaratish' : 'Yaratilmoqda...'}
                    </Button>
                    <Button disabled={isLoading} variant="outlined" onClick={onClose}>
                        Bekor qilish
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};