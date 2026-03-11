import React from 'react';
import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Achievements', href: '#achievements' },
        { label: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { icon: Github, href: 'https://github.com/Prajna-begadi', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/prajna-begadi', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:prajbegadi@gmail.com', label: 'Email' },
    ];

    const handleNavClick = (href: string) => {
        const el = document.getElementById(href.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="relative border-t border-white/[0.06] overflow-hidden">
            {/* Top gradient line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-16 relative">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                                <Code2 size={18} className="text-white" />
                            </div>
                            <span className="font-display font-bold text-white text-lg">
                                Prajna<span className="text-gradient"> B R</span>
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Software Developer & AI Enthusiast building intelligent systems and modern web applications.
                        </p>
                        <div className="flex gap-3 mt-5">
                            {socialLinks.map(link => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                        className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-white hover:border-primary/30 transition-all duration-200 hover:scale-110"
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Nav links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4 font-display">Navigation</h4>
                        <ul className="space-y-2.5">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <button
                                        onClick={() => handleNavClick(link.href)}
                                        className="text-slate-500 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-flex transition-transform"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Status */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4 font-display">Status</h4>
                        <div className="glass-card rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 text-xs">Availability</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-emerald-400 text-xs font-medium">Open</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 text-xs">Response time</span>
                                <span className="text-slate-300 text-xs">Within 24h</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 text-xs">Location</span>
                                <span className="text-slate-300 text-xs">India 🇮🇳</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 text-xs">Remote</span>
                                <span className="text-emerald-400 text-xs font-medium">Available</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-600 text-sm flex items-center gap-1.5">
                        © {currentYear} Prajna B R. Made with{' '}
                        <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" />
                        {' '}and{' '}
                        <Code2 size={12} className="text-primary" />
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        id="footer-back-to-top"
                        className="flex items-center gap-1.5 text-slate-600 hover:text-white text-xs transition-colors duration-200 group"
                    >
                        Back to top
                        <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
