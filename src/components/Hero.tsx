import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail, Github, Sparkles, Zap, Globe } from 'lucide-react';

const TITLES = [
    'Software Developer',
    'AI Enthusiast',
    'Full-Stack Engineer',
    'Problem Solver',
];

const Hero: React.FC = () => {
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Typewriter effect
    useEffect(() => {
        const current = TITLES[titleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && charIndex <= current.length) {
            setDisplayText(current.slice(0, charIndex));
            timeout = setTimeout(() => setCharIndex(c => c + 1), 80);
        } else if (!isDeleting && charIndex > current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex >= 0) {
            setDisplayText(current.slice(0, charIndex));
            timeout = setTimeout(() => setCharIndex(c => c - 1), 45);
        } else {
            setIsDeleting(false);
            setTitleIndex(t => (t + 1) % TITLES.length);
            setCharIndex(0);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, titleIndex]);

    // Canvas particle animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let w = canvas.width = canvas.offsetWidth;
        let h = canvas.height = canvas.offsetHeight;

        const particles: Array<{
            x: number; y: number; vx: number; vy: number;
            size: number; opacity: number; hue: number;
        }> = Array.from({ length: 80 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            hue: Math.random() > 0.5 ? 239 : 270,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity})`;
                ctx.fill();
            });

            // Draw lines between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleScroll = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Canvas background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
            />

            {/* Radial glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-5rem)]">

                    {/* Left content */}
                    <div className="flex flex-col justify-center py-20 lg:py-0 animate-slide-up">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-8 self-start">
                            <div className="glass gradient-border rounded-full px-4 py-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs text-slate-400 font-medium tracking-wide">Available for opportunities</span>
                            </div>
                        </div>

                        {/* Name */}
                        <h1 className="font-display font-bold mb-4">
                            <span className="block text-5xl sm:text-6xl xl:text-7xl text-white leading-tight tracking-tight">
                                Prajna
                            </span>
                            <span className="block text-5xl sm:text-6xl xl:text-7xl leading-tight tracking-tight text-gradient">
                                Begadi
                            </span>
                        </h1>

                        {/* Animated title */}
                        <div className="flex items-center gap-3 mb-6 h-9">
                            <Zap size={18} className="text-primary flex-shrink-0" />
                            <p className="text-xl sm:text-2xl text-slate-300 font-medium font-display">
                                {displayText}
                                <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
                            </p>
                        </div>

                        {/* Tagline */}
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
                            Building <span className="text-primary-light font-medium">intelligent systems</span> and{' '}
                            <span className="text-primary-light font-medium">modern web applications</span> that push the boundaries of what's possible.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mb-14">
                            <button
                                onClick={() => handleScroll('projects')}
                                id="hero-explore-btn"
                                className="btn-primary flex items-center gap-2 group text-base px-6 py-3.5"
                            >
                                Explore My Work
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => handleScroll('contact')}
                                id="hero-contact-btn"
                                className="btn-outline flex items-center gap-2 text-base px-6 py-3.5"
                            >
                                <Mail size={17} />
                                Contact Me
                            </button>
                        </div>

                        {/* Quick stats */}
                        <div className="flex flex-wrap gap-8">
                            {[
                                { value: '4+', label: 'Projects Built' },
                                { value: 'MCA', label: 'Student' },
                                { value: '10+', label: 'Technologies' },
                            ].map(stat => (
                                <div key={stat.label} className="flex flex-col">
                                    <span className="text-2xl font-bold font-display text-gradient">{stat.value}</span>
                                    <span className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Abstract graphic */}
                    <div className="hidden lg:flex items-center justify-center relative">
                        {/* Orbital rings */}
                        <div className="relative w-[440px] h-[440px] flex items-center justify-center">
                            {/* Outer ring */}
                            <div className="absolute w-full h-full rounded-full border border-primary/10 animate-spin-slow" />
                            <div className="absolute w-[85%] h-[85%] rounded-full border border-secondary/10" style={{ animationDirection: 'reverse', animation: 'spin 15s linear infinite reverse' }} />
                            <div className="absolute w-[70%] h-[70%] rounded-full border border-accent/10 animate-spin-slow" style={{ animationDuration: '25s' }} />

                            {/* Orbiting tech chips */}
                            {[
                                { label: 'React', icon: '⚛', angle: 0, dist: 200 },
                                { label: 'Python', icon: '🐍', angle: 72, dist: 200 },
                                { label: 'AI/ML', icon: '🤖', angle: 144, dist: 200 },
                                { label: 'TypeScript', icon: '📘', angle: 216, dist: 200 },
                                { label: 'FastAPI', icon: '⚡', angle: 288, dist: 200 },
                            ].map(({ label, icon, angle, dist }) => {
                                const rad = (angle * Math.PI) / 180;
                                const x = Math.cos(rad) * dist;
                                const y = Math.sin(rad) * dist;
                                return (
                                    <div
                                        key={label}
                                        className="absolute glass gradient-border rounded-xl px-3 py-2 flex items-center gap-2 text-sm text-white font-medium shadow-lg hover:scale-110 transition-transform cursor-default"
                                        style={{ transform: `translate(${x}px, ${y}px)` }}
                                    >
                                        <span>{icon}</span>
                                        <span className="text-xs">{label}</span>
                                    </div>
                                );
                            })}

                            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-80 blur-xl animate-pulse-slow" />
                            <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                                <span className="text-5xl animate-float">👨‍💻</span>
                            </div>

                            <div className="absolute top-4 right-8 glass gradient-border rounded-xl p-3 animate-float shadow-lg">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={14} className="text-yellow-400" />
                                    <span className="text-xs text-slate-300 font-medium">AI Enthusiast</span>
                                </div>
                            </div>
                            <div className="absolute bottom-8 left-4 glass gradient-border rounded-xl p-3 animate-float-delayed shadow-lg">
                                <div className="flex items-center gap-2">
                                    <Globe size={14} className="text-accent" />
                                    <span className="text-xs text-slate-300 font-medium">Web Developer</span>
                                </div>
                            </div>
                            <div className="absolute top-1/2 -right-6 glass gradient-border rounded-xl p-3 animate-float-slow shadow-lg">
                                <Github size={14} className="text-slate-300" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                    <span className="text-xs text-slate-600 font-medium tracking-widest uppercase">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent animate-scroll-indicator" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
