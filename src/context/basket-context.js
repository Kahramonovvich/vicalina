'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {

    const [basket, setBasket] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('productsToBasket')) || [];
        setBasket(stored);
        const totalPrice = basket?.reduce((sum, item) => sum + item.total, 0);
        setTotalPrice(Number(totalPrice));
    }, []);

    useEffect(() => {
        localStorage.setItem('productsToBasket', JSON.stringify(basket));
        const totalPrice = basket?.reduce((sum, item) => sum + item.total, 0);
        setTotalPrice(Number(totalPrice));
    }, [basket]);

    return (
        <BasketContext.Provider value={{ basket, setBasket, totalPrice }}>
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => useContext(BasketContext);