'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Bag from '@/icons/bag.svg'

export default function AddToBasketButton({ id, qty = 1 }) {
    const [count, setCount] = useState(0)
    const [showControls, setShowControls] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('productsToBasket')
        const basket = stored ? JSON.parse(stored) : []
        const item = basket.find(item => item.id === id)
        if (item) {
            setCount(item.qty)
            setShowControls(true)
        }
    }, [id])

    const updateLocalStorage = (newQty) => {
        let basket = JSON.parse(localStorage.getItem('productsToBasket') || '[]')
        const index = basket.findIndex(item => item.id === id)

        if (newQty <= 0) {
            if (index !== -1) basket.splice(index, 1)
        } else {
            if (index !== -1) {
                basket[index].qty = newQty
            } else {
                basket.push({ id, qty: newQty })
            }
        }

        localStorage.setItem('productsToBasket', JSON.stringify(basket))
    }

    const handleAdd = () => {
        const newQty = count + 1
        setCount(newQty)
        updateLocalStorage(newQty)
    }

    const handleRemove = () => {
        const newQty = count - 1
        setCount(newQty)
        updateLocalStorage(newQty)
        if (newQty <= 0) setShowControls(false)
    }

    const handleInitialClick = () => {
        setCount(qty)
        setShowControls(true)
        updateLocalStorage(qty)
    }

    return (
        <div className="flex items-center space-x-2">
            <AnimatePresence mode="wait">
                {!showControls ? (
                    <motion.button
                        key="bag"
                        onClick={handleInitialClick}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        className="bg-primary w-10 h-10 rounded-full flex items-center justify-center"
                    >
                        <Bag className="w-5 h-5 text-white" />
                    </motion.button>
                ) : (
                    <motion.div
                        key="controls"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        className="flex items-center gap-2 border rounded-full p-1 h-10"
                    >
                        <button
                            onClick={handleRemove}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                            <RemoveIcon fontSize="small" />
                        </button>
                        <span className="w-6 text-center">{count}</span>
                        <button
                            onClick={handleAdd}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                            <AddIcon fontSize="small" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}