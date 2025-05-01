'use client'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Bag from '@/icons/bag.svg'
import LikeButtonComponent from './LikeButtonComponent'
import { useEffect, useState } from 'react'
import { useBasket } from '@/context/basket-context'
import { motion, AnimatePresence } from 'framer-motion'

const translations = {
    uz: {
        add: "Savatchaga qo'shish",
        added: "Savatchadan o'chirish",
        addedShort: "O'chirish",
        addShort: "Qo'shish",
    },
    ru: {
        add: "Добавить в корзину",
        added: "Убрать из корзины",
        addedShort: "Убрать",
        addShort: "Добавить",
    }
};

export default function ToBasketFav({ id, products, languageId }) {

    const { setBasket } = useBasket();
    const [count, setCount] = useState(1);
    const [showControls, setShowControls] = useState(false);

    const t = languageId === 1 ? translations.uz : translations.ru;

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
            }
        }

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
            <motion.button
                layout
                onClick={showControls ? handleRemove : handleInitialClick}
                className={`addToBasket bg-primary flex items-center justify-center text-white
                    gap-x-4 px-8 py-3.5 rounded leading-tight font-semibold flex-1 disabled:cursor-not-allowed`}
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
                            <span className='md:block hidden'>{t.added}</span>
                            <span className='block md:hidden'>{t.addedShort}</span>
                        </motion.span>
                    ) : (
                        <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className='md:block hidden'>{t.add}</span>
                            <span className='block md:hidden'>{t.addShort}</span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </motion.div>
    )
};