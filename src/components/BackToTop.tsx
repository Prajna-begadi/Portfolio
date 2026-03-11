import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button
            id="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className={`fixed bottom-8 right-6 z-50 w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary
        flex items-center justify-center shadow-lg shadow-primary/30 transition-all duration-500 glow-primary group
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
            <ArrowUp size={18} className="text-white group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
    );
};

export default BackToTop;
