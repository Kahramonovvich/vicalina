'use client';
import { IconButton, Typography, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateAdminModal from './CreateAdminModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UpdateAdminModal from './UpdateAdminModal';

export default function AdminComponent({ admins, token }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [login, setLogin] = useState('');

    const router = useRouter();

    const deleteAdmin = async (id) => {
        if (!window.confirm(`${id} adminni o'chirmoqchisiz?`)) return;

        const formData = new FormData();
        formData.append('id', id);

        try {
            const res = await fetch(`/api/Admin/DeleteAdmin`, {
                method: 'DELETE',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res);
            if (res.ok) {
                alert("Admin o'chirildi");
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            alert('Server bilan ulanishda xatolik');
        }
    };

    const handleUpdate = (login) => {
        setLogin(login);
        setUpdateOpen(true);
    };

    return (
        <div className='admins p-3 pb-1'>
            <div className="top mb-3">
                <Button onClick={() => setModalOpen(true)}>Admin qo'shish</Button>
            </div>
            {admins?.length === 0 ? (
                <Typography variant="body1" className='text-center'>Admin yo'q</Typography>
            ) : (
                admins.map((admin) => (
                    <Box
                        key={admin.id}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p={1}
                        mb={1}
                        border="1px solid #ccc"
                        borderRadius="8px"
                    >
                        <Box>
                            <Typography variant="subtitle1">ID: {admin.id}</Typography>
                            <Typography variant="subtitle2">Логин: {admin.login}</Typography>
                        </Box>
                        <Box>
                            <IconButton aria-label="update" color="primary" onClick={() => handleUpdate(admin.login)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" color="error" onClick={() => deleteAdmin(admin.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ))
            )}
            <CreateAdminModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                token={token}
            />
            <UpdateAdminModal
                open={updateOpen}
                onClose={() => setUpdateOpen(false)}
                login={login}
                token={token}
            />
        </div>
    );
};