'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import FilterIcon from '@/icons/Filter 24px.svg';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { navMenu } from '@/constants/constants';
import { Slider } from '@mui/material';
import MorphArrow from './MorphArrow';
import RatingIcon from './RatingIcon';
import CheckIcon from '@/icons/check 1.svg'

const options = [
    { value: '', label: 'Tanlang' },
    { value: 'rating', label: 'Reytingi yuqori' },
    { value: 'cheaper', label: 'Arzonroq' },
    { value: 'expensive', label: 'Qimmatroq' },
    { value: 'discounted', label: "Chegirma bo'yicha" },
    { value: 'newest', label: "Yaqinda qo'shilgan" },
];

function countProductsByCategory(products, allCategories) {
    const countMap = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    return allCategories.map(category => ({
        category,
        count: countMap[category] || 0
    }));
};

const getMinMaxPrices = (products) => {
    if (!products || products.length === 0) return { min: 0, max: 0 };

    const prices = products.map((product) =>
        product.discount ? product.newPrice : product.price
    );

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { min, max };
};

const ratingBox = [
    { value: 5 },
    { value: 4 },
    { value: 3 },
    { value: 2 },
    { value: 1 },
];

// const applyFilters = () => {
//     const params = new URLSearchParams();

//     if (filter) params.set('filter', filter);
//     if (rating) params.set('rating', rating);
//     if (price) params.set('price', price);
//     if (tag) params.set('tag', tag);

//     router?.push(`/catalog/${category.toLowerCase().replace(/\s+/g, '-')}?${params.toString().toLowerCase()}`);
// };

export default function FilterComponents({ category, products, filteredProducts, priceFrom, priceTo, filter, rating, tag }) {

    const allCategories = navMenu.map((item) => item.name);
    const result = countProductsByCategory(products, allCategories);
    const { min, max } = getMinMaxPrices(filteredProducts);
    const router = useRouter();

    const [isOpen, setIsOpen] = useState([false, false]);
    const [value, setValue] = useState([priceFrom || min, priceTo || max]);

    const applyFilters = (strPrice) => {
        const params = new URLSearchParams();

        if (filter) params.set('filter', filter);
        if (rating) params.set('rating', rating);
        if (strPrice) params.set('price', strPrice);
        if (tag) params.set('tag', tag);

        router?.push(`/catalog/${category.toLowerCase().replace(/\s+/g, '-')}?${params.toString().toLowerCase()}`);
    };

    const toggleItem = (index) => {
        setIsOpen(prev =>
            prev.map((value, i) => i === index ? !value : value)
        );
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFinalChange = (event, newValue) => {
        const strPrice = newValue.join('-');
        applyFilters(strPrice);
    };

    useEffect(() => {
        if (!priceFrom && !priceTo) {
            setValue([min, max]);
        };
    }, [priceFrom, priceTo]);

    return (
        <div className='filterComponents flex flex-col gap-y-5 mb-5'>
            <div className="allCatalog border-b">
                <button
                    onClick={() => toggleItem(0)}
                    className="top flex items-center justify-between w-full mb-5 font-medium text-xl leading-normal"
                >
                    Barcha Kataloglar
                    <MorphArrow isOpen={isOpen[0]} />
                </button>
                <AnimatePresence initial={false}>
                    {isOpen[0] && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            {result?.map((cat) => (
                                <div className="box py-2.5 last-of-type:pb-[34px]" key={cat.category}>
                                    <Link
                                        href={`/catalog/${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="box flex items-center gap-x-2"
                                    >
                                        <div
                                            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center
                                                ${category?.toLowerCase() === cat.category.toLowerCase() ? 'border-primary' : ''}`}
                                        >
                                            <div className={`w-3 h-3 bg-primary rounded-full 
                                                ${category?.toLowerCase() === cat.category.toLowerCase() ? 'opacity-100' : 'opacity-0'}`}
                                            ></div>
                                        </div>
                                        <h2 className="text-sm leading-normal text-[#1A1A1A]">
                                            {cat.category} <span className="text-[#808080]">({cat.count})</span>
                                        </h2>
                                    </Link>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="priceChange border-b">
                <button
                    onClick={() => toggleItem(1)}
                    className="top flex items-center justify-between w-full mb-5 font-medium text-xl leading-normal"
                >
                    Narx
                    <MorphArrow isOpen={isOpen[1]} />
                </button>
                <AnimatePresence initial={false}>
                    {isOpen[1] && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="box mb-4 flex h-5 items-center px-2.5">
                                <Slider
                                    value={value}
                                    onChange={handleChange}
                                    onChangeCommitted={handleFinalChange}
                                    min={min}
                                    max={max}
                                    step={5000}
                                    valueLabelDisplay="auto"
                                    className='!p-0'
                                />
                            </div>
                            <p className='text-[#1A1A1A] text-sm leading-normal font-black pb-6'>
                                <span className='text-[#4D4D4D] font-normal'>Narx: </span>
                                {value[0].toLocaleString('ru-RU').replace(/\s/g, '.')} — {value[1].toLocaleString('ru-RU').replace(/\s/g, '.')} so’m
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export function RatingChange({ filter, rating, tag, price, category }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedRatings, setSelectedRatings] = useState(Number(rating));
    const router = useRouter();

    const applyFilters = (value) => {
        const params = new URLSearchParams();

        if (filter) params.set('filter', filter);
        if (Number(value) !== Number(rating)) params.set('rating', value);
        if (price) params.set('price', price);
        if (tag) params.set('tag', tag);

        router?.push(`/catalog/${category.toLowerCase().replace(/\s+/g, '-')}?${params.toString().toLowerCase()}`);
    };

    const toggleRating = (value) => {
        setSelectedRatings((prev) => {
            if (prev === value) {
                return '';
            } else {
                return value;
            }
        });
        applyFilters(value);
    };

    useEffect(() => {
        setSelectedRatings(Number(rating));
    }, [rating]);

    return (
        <div className="ratingChange border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="top flex items-center justify-between w-full mb-5 font-medium text-xl leading-normal"
            >
                Reyting
                <MorphArrow isOpen={isOpen} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        {ratingBox.map((el) => (
                            <div
                                key={el.value}
                                className="ratingBox py-2.5 flex gap-x-2 items-center last-of-type:pb-6">
                                <input
                                    type="checkbox"
                                    name="rating"
                                    id={`ratingCheck${el.value}`}
                                    className='peer hidden'
                                    checked={el.value === selectedRatings}
                                    onChange={() => toggleRating(el.value)}
                                />
                                <div
                                    className="w-5 h-5 flex items-center justify-center border border-[#CCCCCC]
                                        peer-checked:bg-primary rounded-[3px] cursor-pointer"
                                >
                                    {selectedRatings === el.value && (
                                        <CheckIcon />
                                    )}
                                </div>
                                <label
                                    htmlFor={`ratingCheck${el.value}`}
                                    className='flex items-center gap-x-1 cursor-pointer'
                                >
                                    <RatingIcon
                                        value={el.value}
                                        className='!text-lg  !text-orange'
                                    />
                                    <span className='text-sm leading-normal'>{el.value}.0</span>
                                </label>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export function FilterDropdown({ filter, category, rating, price, tag }) {

    const router = useRouter();
    const [sort, setSort] = useState(filter || '');
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectedLabel = options.find(opt => opt.value === sort)?.label || 'Tanlang';

    const applyFilters = (selectedValue) => {
        const params = new URLSearchParams();

        if (selectedValue) params.set('filter', selectedValue);
        if (rating) params.set('rating', rating);
        if (price) params.set('price', price);
        if (tag) params.set('tag', tag);

        router?.push(`/catalog/${category.toLowerCase().replace(/\s+/g, '-')}?${params.toString().toLowerCase()}`);
    };

    const handleSelect = (value) => {
        applyFilters(value);
        setSort(value);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!filter) {
            setSort('');
        };
    }, [filter]);

    return (
        <div className="flex items-center">
            <label className="text-sm text-[#808080] leading-normal mr-2">Saralash:</label>
            <div className="relative" ref={dropdownRef}>
                <div
                    onClick={() => setOpen(prev => !prev)}
                    className="border border-[#E6E6E6] px-4 py-2.5 rounded cursor-pointer flex items-center justify-between min-w-[200px]"
                >
                    <span className='text-sm leading-normal text-[#4D4D4D]'>{selectedLabel}</span>
                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className='w-3.5 h-3.5 flex items-center justify-center'
                    >
                        <KeyboardArrowDownRoundedIcon
                            className='!text-sm'
                        />
                    </motion.div>
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-10 mt-1 bg-white border border-[#E6E6E6] rounded shadow-md w-full"
                        >
                            {options.map((opt) => (
                                <li
                                    key={opt.value}
                                    onClick={() => handleSelect(opt.value)}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${sort === opt.value ? 'bg-gray-100' : ''}`}
                                >
                                    {opt.label}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export function FilterButton() {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const cookieValue = Cookies.get('isVisible');
        if (cookieValue !== undefined) {
            setIsVisible(cookieValue === 'true');
        }
    }, []);

    const toggleFilterButton = () => {
        const newValue = !isVisible;
        setIsVisible(newValue);
        Cookies.set('isVisible', String(newValue));
        router.replace(`${pathname}?${searchParams.toString()}`);
    };

    return (
        <button
            className='flex items-center gap-x-3 py-3.5 px-8 bg-primary text-white rounded-full font-semibold text-sm leading-tight'
            onClick={toggleFilterButton}
        >
            Filter
            <FilterIcon />
        </button>
    );
};