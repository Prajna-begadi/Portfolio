import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

interface NavbarProps {
    scrollY: number;
}

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ scrollY }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const isScrolled = scrollY > 30;

    useEffect(() => {
        const sections = navLinks.map(l => l.href.slice(1));
        const handleScroll = () => {
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(sections[i]);
                    return;
                }
            }
            setActiveSection('');
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.getElementById(href.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'py-3 bg-[rgba(2,8,23,0.85)] backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/50'
                    : 'py-5 bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    className="flex items-center gap-2.5 group"
                    onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
                        <Code2 size={18} className="text-white" />
                    </div>
                    <span className="font-display font-700 text-white text-lg tracking-tight">
                        Prajna<span className="text-gradient"> B R</span>
                    </span>
                </a>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => {
                        const isActive = activeSection === link.href.slice(1);
                        return (
                            <li key={link.href}>
                                <button
                                    onClick={() => handleNavClick(link.href)}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    {isActive && (
                                        <span className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08]" />
                                    )}
                                    <span className="relative">{link.label}</span>
                                    {!isActive && (
                                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-300 rounded-full" />
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* CTA Desktop */}
                <a
                    href="#contact"
                    onClick={e => { e.preventDefault(); handleNavClick('#contact'); }}
                    className="hidden md:flex btn-primary text-sm py-2.5 px-5 items-center gap-2"
                >
                    Let's Talk
                </a>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-slate-400 hover:text-white transition-colors p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 py-4 bg-[rgba(2,8,23,0.95)] backdrop-blur-xl border-t border-white/[0.05]">
                    <ul className="flex flex-col gap-1">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <button
                                    onClick={() => handleNavClick(link.href)}
                                    className="w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all duration-200 text-sm font-medium"
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                        <li className="pt-2">
                            <a
                                href="#contact"
                                onClick={() => handleNavClick('#contact')}
                                className="block text-center btn-primary text-sm py-3"
                            >
                                Let's Talk
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
