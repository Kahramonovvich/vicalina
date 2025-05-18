'use client';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function MultiOrderModal({ open, onClose, products, totalAmount }) {

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const createOrder = async () => {
        if (!phoneNumber || products.length === 0) {
            alert("Telefon raqami va mahsulotlar kerak");
            return;
        }

        const orderData = {
            customerData: {
                name: fullName,
                phoneNumber: `+998${phoneNumber}`,
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
                    InputProps={{
                        style: {
                            fontWeight: '600',
                            fontFamily: 'DM Sans, sans-serif',
                        },
                    }}
                />
                <div className="box relative">
                    {isFocused && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-3.5 font-semibold pointer-events-none">
                            +998
                        </div>
                    )}
                    <TextField
                        label="Telefon raqam"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        type='number'
                        onWheel={(e) => e.target.blur()}
                        className='w-full'
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        InputProps={{
                            style: {
                                paddingLeft: '40px',
                                fontWeight: '600',
                                fontFamily: 'DM Sans, sans-serif',
                            },
                        }}
                    />
                </div>
                <Button variant="contained" onClick={createOrder}>Yuborish</Button>
            </Box>
        </Modal>
    );
};