'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import FilterIcon from '@/icons/Filter 24px.svg';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { navMenu } from '@/constants/constants';

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

// const applyFilters = () => {
//     const params = new URLSearchParams();

//     if (filter) params.set('filter', filter);
//     if (rating) params.set('rating', rating);
//     if (price) params.set('price', price);
//     if (tag) params.set('tag', tag);

//     router?.push(`/catalog/${category}?${params.toString().toLowerCase()}`);
// };

export default function FilterComponents({ category, products }) {

    const allCategories = navMenu.map((item) => item.name);
    const result = countProductsByCategory(products, allCategories);
    const router = useRouter();

    return (
        <div className='filterComponents flex flex-col gap-y-5'>
            <div className="allCatalog pb-6 border-b">
                <div className="top flex items-center justify-between mb-5">
                    <button className='font-medium text-xl leading-normal'>
                        Barcha Kataloglar
                    </button>
                    <KeyboardArrowDownRoundedIcon />
                </div>
                <div className="content">
                    {result?.map((cat) => (
                        <div className="box py-2.5" key={cat.category}>
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
                                <h2 className='text-sm leading-normal text-[#1A1A1A]'>
                                    {cat.category} <span className='text-[#808080]'>({cat.count})</span>
                                </h2>
                            </Link>
                        </div>
                    ))}
                </div>
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

export function FilterDropdown({ filter, category }) {

    const router = useRouter();
    const [sort, setSort] = useState(filter || '');
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectedLabel = options.find(opt => opt.value === sort)?.label || 'Tanlang';

    const applyFilters = (selectedValue) => {
        const params = new URLSearchParams();
        if (selectedValue) params.set('filter', selectedValue);
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