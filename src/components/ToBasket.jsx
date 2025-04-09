'use client'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Bag from '@/icons/bag.svg'
import LikeButtonComponent from './LikeButtonComponent'
import { useEffect, useState } from 'react'
import { useBasket } from '@/context/basket-context'
import { motion, AnimatePresence } from 'framer-motion'

export default function ToBasket({ id, products }) {

    const { setBasket } = useBasket();

    const [count, setCount] = useState(1);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('productsToBasket')
        const basket = stored ? JSON.parse(stored) : []
        const item = basket.find(item => item.id === id)
        if (item) {
            setCount(item.qty)
            setShowControls(true)
        }
    }, [id]);

    const updateLocalStorage = (newQty) => {
        let basket = JSON.parse(localStorage.getItem('productsToBasket') || '[]');
        const index = basket.findIndex(item => item.id === id);

        if (newQty <= 0) {
            if (index !== -1) basket.splice(index, 1);
        } else {
            if (index !== -1) {
                basket[index].qty = newQty;
            } else {
                basket.push({ id, qty: newQty });
            };
        };

        const result = basket.map(basketItem => {
            const product = products.find(p => p.id === basketItem.id);
            const productPrice = product?.discount ? product.newPrice : product.price;
            if (product) {
                return {
                    ...product,
                    qty: basketItem.qty,
                    total: productPrice * basketItem.qty,
                };
            }
            return null;
        }).filter(Boolean);

        localStorage.setItem('productsToBasket', JSON.stringify(result));
        setBasket(result);
    };

    const handleAdd = () => {
        const newQty = count + 1;
        setCount(newQty);
        updateLocalStorage(newQty);
    }

    const handleRemove = () => {
        const newQty = count - 1;
        setCount(newQty);
        updateLocalStorage(newQty);
        if (newQty <= 0) setShowControls(false);
    }

    const handleInitialClick = () => {
        setCount(1);
        updateLocalStorage(1);
        setShowControls(true);
    };

    return (
        <motion.div layout className="flex items-center gap-x-3">
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        className="qty flex items-center p-2 border rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={handleRemove}
                            className='w-[34px] h-[34px] bg-[#F2F2F2] rounded-full'
                        >
                            <RemoveIcon />
                        </button>
                        <p className='w-6 flex items-center justify-center'>
                            {count}
                        </p>
                        <button
                            onClick={handleAdd}
                            className='w-[34px] h-[34px] bg-[#F2F2F2] rounded-full'
                        >
                            <AddIcon />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                layout
                onClick={handleInitialClick}
                className={`addToBasket bg-primary flex items-center justify-center text-white
                    чgap-x-4 py-4 leading-tight font-semibold flex-1 rounded-full disabled:cursor-not-allowed`}
                disabled={showControls}
                transition={{ layout: { duration: 0.3 } }}
            >
                <AnimatePresence mode="wait">
                    {showControls ? (
                        <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className='md:block hidden'>Savatchaga qo'shildi</span>
                            <span className='block md:hidden'>Qo'shildi</span>
                        </motion.span>
                    ) : (
                        <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className='md:block hidden'>Savatchaga qo'shish</span>
                            <span className='block md:hidden'>Qo'shish</span>
                        </motion.span>
                    )}
                </AnimatePresence>
                <Bag />
            </motion.button>
            <div className='bg-[#0000661A] w-[52px] h-[52px] flex items-center justify-center rounded-full'>
                <LikeButtonComponent id={id} />
            </div>
        </motion.div>
    )
};