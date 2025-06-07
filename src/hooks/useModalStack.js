import { useState } from 'react';

export function useModalStack(modalKeys) {
    const [activeModal, setActiveModal] = useState(null);

    const isOpen = (key) => activeModal === key;
    const open = (key) => setActiveModal(key);
    const close = () => setActiveModal(null);

    return { isOpen, open, close };
}
