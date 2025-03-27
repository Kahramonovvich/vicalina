import { useEffect, useState } from 'react';

export const useLikedProduct = (id) => {
    const [isLiked, setIsLiked] = useState(false);

    const checkLiked = () => {
        const liked = JSON.parse(localStorage.getItem('likedProducts') || '[]');
        setIsLiked(liked.includes(id));
    };

    useEffect(() => {
        checkLiked();

        const handleStorage = () => {
            checkLiked();
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [id]);

    const toggleLiked = () => {
        const liked = JSON.parse(localStorage.getItem('likedProducts') || '[]');
        let updated;

        if (liked.includes(id)) {
            updated = liked.filter(item => item !== id);
        } else {
            updated = [...liked, id];
        }

        localStorage.setItem('likedProducts', JSON.stringify(updated));
        checkLiked();

        window.dispatchEvent(new Event('storage'));
    };

    return { isLiked, toggleLiked };
};