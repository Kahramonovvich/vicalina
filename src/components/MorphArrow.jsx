import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const pathVariants = {
    up: "M 6 16 L 12 9.5 L 18 16",
    line: "M 6 12 L 12 12 L 18 12",
    down: "M 6 8 L 12 14.5 L 18 8"
};

export default function MorphArrow({ isOpen }) {
    const [currentPath, setCurrentPath] = useState(!isOpen ? "down" : "up");

    useEffect(() => {
        setCurrentPath("line");
        const timeout = setTimeout(() => {
            setCurrentPath(!isOpen ? "down" : "up");
        }, 150);
        return () => clearTimeout(timeout);
    }, [isOpen]);

    return (
        <svg width="18" height="18" viewBox="0 0 24 24">
            <motion.path
                d={pathVariants[currentPath]}
                animate={{ d: pathVariants[currentPath] }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                fill="transparent"
            />
        </svg>
    );
};