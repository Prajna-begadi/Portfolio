import React, { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const useIntersection = (ref: React.RefObject<Element>) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return isVisible;
};

const socialLinks = [
    {
        id: 'email',
        icon: Mail,
        label: 'Email',
        value: 'prajbegadi@gmail.com',
        href: 'mailto:prajbegadi@gmail.com',
        color: 'text-rose-400',
        bg: 'bg-rose-500/10 border-rose-500/20 hover:border-rose-500/40 hover:bg-rose-500/15',
    },
    {
        id: 'github',
        icon: Github,
        label: 'GitHub',
        value: 'github-prajnabegadi',
        href: 'https://github.com/Prajna-begadi',
        color: 'text-slate-300',
        bg: 'bg-white/[0.04] border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.07]',
    },
    {
        id: 'linkedin',
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'linkedin-prajnabegadi',
        href: 'https://www.linkedin.com/in/prajna-begadi',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/15',
    },
];

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Contact: React.FC = () => {
    const ref = useRef<HTMLElement>(null!);
    const isVisible = useIntersection(ref);
    const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate async send
        await new Promise(r => setTimeout(r, 1500));
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
    };

    const inputClass = `w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-slate-300 text-sm placeholder:text-slate-600
    focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300`;

    return (
        <section id="contact" ref={ref} className="py-28 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div
                    className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <p className="section-label mb-3">Get In Touch</p>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                        Let's <span className="text-gradient">Connect</span>
                    </h2>
                    <div className="mt-4 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <p className="text-slate-500 mt-5 max-w-md mx-auto text-sm leading-relaxed">
                        Have a project in mind? Want to collaborate? Or just want to say hi? My inbox is always open.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left — Info */}
                    <div
                        className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                    >
                        <div className="space-y-5 mb-10">
                            {socialLinks.map(link => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.id}
                                        href={link.href}
                                        id={`contact-${link.id}`}
                                        target={link.id !== 'email' ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group ${link.bg}`}
                                    >
                                        <div className={`w-11 h-11 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon size={20} className={link.color} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-600 font-medium mb-0.5">{link.label}</p>
                                            <p className={`text-sm font-medium ${link.color}`}>{link.value}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Location */}
                        <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                                <MapPin size={20} className="text-primary-light" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-600 mb-0.5">Location</p>
                                <p className="text-white font-medium text-sm">India 🇮🇳</p>
                                <p className="text-slate-600 text-xs">Open to remote opportunities</p>
                            </div>
                            <div className="ml-auto flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs text-emerald-500 font-medium">Available</span>
                            </div>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div
                        className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="glass-card rounded-2xl p-8 space-y-5"
                            id="contact-form"
                        >
                            <h3 className="text-white font-semibold font-display text-lg mb-6">Send a Message</h3>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="contact-name" className="block text-xs text-slate-500 mb-2 font-medium">Name</label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-xs text-slate-500 mb-2 font-medium">Email</label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-subject" className="block text-xs text-slate-500 mb-2 font-medium">Subject</label>
                                <input
                                    id="contact-subject"
                                    name="subject"
                                    type="text"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="What's this about?"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="block text-xs text-slate-500 mb-2 font-medium">Message</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or just say hi…"
                                    required
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            <button
                                type="submit"
                                id="contact-submit-btn"
                                disabled={status === 'sending' || status === 'success'}
                                className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending…
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        <CheckCircle size={18} />
                                        Message Sent!
                                    </>
                                ) : status === 'error' ? (
                                    <>
                                        <AlertCircle size={18} />
                                        Try again
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={16} />
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <p className="text-center text-emerald-400 text-sm">
                                    🎉 Thanks! I'll get back to you soon.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
