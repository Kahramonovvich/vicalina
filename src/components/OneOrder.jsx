'use client';

import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function OneOrderModal({ open, onClose, id, price }) {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const createOrder = async () => {
        if (!phoneNumber) {
            alert("Telefon raqami majburiy");
            return;
        }

        const orderData = {
            customerData: {
                fullName,
                phoneNumber,
            },
            products: [
                {
                    productId: id,
                    count: 1,
                },
            ],
            totalAmount: price,
        };

        const res = await fetch('/api/Order/CreateOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const result = await res.json();

        if (res.ok) {
            alert('Buyurtma muvaffaqiyatli yuborildi!');
            onClose();
            setFullName('');
            setPhoneNumber('');
        } else {
            alert(result.error || 'Buyurtma jo‘natishda xatolik');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className="modal-content"
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
                <Typography variant="h6" fontWeight="bold">
                    Buyurtma berish
                </Typography>
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
                <Button variant="contained" onClick={createOrder}>
                    Yuborish
                </Button>
            </Box>
        </Modal>
    );
};