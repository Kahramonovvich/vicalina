'use client';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function MultiOrderModal({ open, onClose, products, totalAmount }) {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const createOrder = async () => {
        if (!phoneNumber || products.length === 0) {
            alert("Telefon raqami va mahsulotlar kerak");
            return;
        }

        const orderData = {
            customerData: {
                fullName,
                phoneNumber,
            },
            products,
            totalAmount,
        };

        const res = await fetch('/api/Order/CreateOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });

        const result = await res.json();

        if (res.ok) {
            alert('Buyurtma muvaffaqiyatli yuborildi!');
            setFullName('');
            setPhoneNumber('');
            onClose();
        } else {
            alert(result.error || 'Buyurtma jo‘natishda xatolik');
        }
    };

    console.log(products);
    console.log(totalAmount);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                    width: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography variant="h6" fontWeight="bold">Buyurtma berish</Typography>
                <TextField
                    label="Ism Familiya"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                    label="Telefon raqam"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <Button variant="contained" onClick={createOrder}>Yuborish</Button>
            </Box>
        </Modal>
    );
};