import React, { useState, useEffect, ReactNode } from 'react';

interface TypingEffectProps {
    children: ReactNode;
    speed?: number;
}

const extractTextFromChildren = (children: ReactNode): string => {
    if (typeof children === 'string') {
        return children;
    }

    if (Array.isArray(children)) {
        return children.map(extractTextFromChildren).join('');
    }

    if (React.isValidElement(children) && typeof children.props.children === 'string') {
        return children.props.children;
    }

    return '';
};

const TypingEffect: React.FC<TypingEffectProps> = ({ children, speed = 100 }) => {
    const [displayedText, setDisplayedText] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isTypingActive, setIsTypingActive] = useState<boolean>(true);

    const textToType = extractTextFromChildren(children);

    useEffect(() => {
        if (isTypingActive) {
            const typingInterval = setInterval(() => {
                if (currentIndex < textToType.length) {
                    setDisplayedText(prevText => prevText + textToType[currentIndex]);
                    setCurrentIndex(prevIndex => prevIndex + 1);
                } else {
                    clearInterval(typingInterval);
                    setIsTypingActive(false); // Desativa o efeito de digitação ao finalizar
                }
            }, speed);

            return () => clearInterval(typingInterval);
        }
    }, [currentIndex, isTypingActive, speed, textToType]);

    return <span>{displayedText}</span>;
};

export default TypingEffect;