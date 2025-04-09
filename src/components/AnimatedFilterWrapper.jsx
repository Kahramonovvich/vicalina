'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedFilterWrapper({ isVisible, children }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='absolute md:relative bg-white md:border-none border w-full z-[100] md:p-0 p-5 pb-0 rounded-xl top-0 left-0'
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}