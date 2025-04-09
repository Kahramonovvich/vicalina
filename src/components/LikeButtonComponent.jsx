'use client'
import { motion } from 'framer-motion';
import { useLikedProduct } from '@/hooks/useLikedProducts';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function LikeButtonComponent({ id, params }) {

    const { isLiked, toggleLiked } = useLikedProduct(id);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const size = {
        w: isMobile ? 19 : 23,
        h: isMobile ? 17 : 20
    };

    return (
        <motion.button
            whileTap={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={toggleLiked}
        >
            <motion.svg
                key={isLiked ? 'filled' : 'outline'}
                width={params?.w || size?.w}
                height={params?.h || size?.h}
                viewBox="0 0 23 20"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.3, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {isLiked && (
                    <motion.path
                        d="M11.5 19.14C-6.5 7.5 5 -3 11.5 4.5C18 -3 30.5 7.5 11.5 19.14Z"
                        fill="#000066"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
                <motion.path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.51642 2.76173C3.65477 1.40488 5.33309 0.606445 7.4144 0.606445C9.12037 0.606445 10.5175 1.45105 11.5269 2.59797C12.5257 1.45287 13.9108 0.606445 15.6437 0.606445C17.7515 0.606445 19.4346 1.40135 20.5698 2.76535C21.6806 4.10011 22.1782 5.87075 22.1782 7.705C22.1782 10.5978 20.4017 13.1204 18.3922 15.0422C16.3535 16.992 13.8784 18.5146 12.0535 19.4141C11.7205 19.5782 11.3299 19.5765 10.9983 19.4096C9.17755 18.4928 6.7047 16.9627 4.66753 15.0144C2.66109 13.0954 0.882568 10.582 0.882568 7.705C0.882568 5.86164 1.40011 4.09231 2.51642 2.76173ZM4.32914 4.28254C3.64924 5.09294 3.24875 6.28135 3.24875 7.705C3.24875 9.60501 4.45223 11.5343 6.30298 13.3043C7.93876 14.8687 9.92952 16.1623 11.5355 17.0222C13.1355 16.1794 15.1229 14.8949 16.7568 13.3321C18.6053 11.5643 19.812 9.62504 19.812 7.705C19.812 6.27224 19.422 5.08515 18.7511 4.27893C18.1045 3.50195 17.112 2.97263 15.6437 2.97263C14.4073 2.97263 13.3061 3.82958 12.5823 5.23558C12.3794 5.6295 11.9735 5.87709 11.5305 5.87711C11.0874 5.87713 10.6814 5.6296 10.4786 5.23569C9.75782 3.83611 8.62122 2.97263 7.4144 2.97263C5.98303 2.97263 4.98699 3.49841 4.32914 4.28254Z"
                    fill={isLiked ? '#000066' : '#222'}
                />
            </motion.svg>
        </motion.button>
    )
};