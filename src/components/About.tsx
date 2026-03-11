import React, { useEffect, useRef } from 'react';
import { GraduationCap, Code, Brain, Puzzle, Coffee } from 'lucide-react';

const useIntersection = (ref: React.RefObject<Element>, options?: IntersectionObserverInit) => {
    const [isVisible, setIsVisible] = React.useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.15, ...options });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return isVisible;
};

const infoCards = [
    {
        icon: GraduationCap,
        title: 'MCA Student',
        desc: 'Masters in Computer Applications',
        color: 'from-blue-500/20 to-indigo-500/10',
        border: 'border-blue-500/20',
        iconColor: 'text-blue-400',
        glow: 'rgba(59,130,246,0.15)',
    },
    {
        icon: Code,
        title: 'Full-Stack Dev',
        desc: 'React, FastAPI, Flutter & more',
        color: 'from-indigo-500/20 to-purple-500/10',
        border: 'border-indigo-500/20',
        iconColor: 'text-indigo-400',
        glow: 'rgba(99,102,241,0.15)',
    },
    {
        icon: Brain,
        title: 'AI Enthusiast',
        desc: 'Building intelligent applications',
        color: 'from-purple-500/20 to-pink-500/10',
        border: 'border-purple-500/20',
        iconColor: 'text-purple-400',
        glow: 'rgba(168,85,247,0.15)',
    },
    {
        icon: Puzzle,
        title: 'Problem Solver',
        desc: 'Turning complex ideas into reality',
        color: 'from-cyan-500/20 to-blue-500/10',
        border: 'border-cyan-500/20',
        iconColor: 'text-cyan-400',
        glow: 'rgba(6,182,212,0.15)',
    },
    {
        icon: Coffee,
        title: 'Chess Player',
        desc: 'Strategic thinking on & off the board',
        color: 'from-amber-500/20 to-orange-500/10',
        border: 'border-amber-500/20',
        iconColor: 'text-amber-400',
        glow: 'rgba(245,158,11,0.15)',
    },
];

const About: React.FC = () => {
    const ref = useRef<HTMLElement>(null!);
    const isVisible = useIntersection(ref);

    return (
        <section id="about" ref={ref} className="py-28 relative overflow-hidden">
            {/* Section background accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <div
                    className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <p className="section-label mb-3">Who I Am</p>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                        About <span className="text-gradient">Me</span>
                    </h2>
                    <div className="mt-4 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Story */}
                    <div
                        className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                    >
                        <div className="glass-card rounded-2xl p-8 space-y-5">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-lg shadow-primary/20">
                                    👋
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-lg">Hey there!</p>
                                    <p className="text-xs text-slate-500">Based in India</p>
                                </div>
                            </div>

                            <p className="text-slate-300 leading-relaxed">
                                I'm <span className="text-white font-semibold">Prajna Begadi</span>, a passionate Software Developer and MCA student with a deep love for building things that matter. I thrive at the intersection of{' '}
                                <span className="text-primary-light font-medium">Artificial Intelligence</span> and{' '}
                                <span className="text-primary-light font-medium">modern web development</span>.
                            </p>

                            <p className="text-slate-400 leading-relaxed">
                                My journey started with curiosity — tinkering with code late into the night, exploring how things work under the hood. Today, I build full-stack applications, AI-powered tools, and mobile apps that solve real problems.
                            </p>

                            <p className="text-slate-400 leading-relaxed">
                                When I'm not coding, you'll find me at the chess board — a game that sharpens my strategic thinking and patience, skills that translate perfectly into software engineering.
                            </p>

                            {/* Tech highlights */}
                            <div className="pt-4 border-t border-white/[0.06]">
                                <p className="text-xs text-slate-500 font-medium tracking-widest uppercase mb-3">Currently working with</p>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'TypeScript', 'Python', 'FastAPI', 'Flutter', 'Firebase', 'AWS'].map(tech => (
                                        <span key={tech} className="tech-badge">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info cards */}
                    <div
                        className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {infoCards.map((card, i) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={card.title}
                                        className={`group relative glass-card rounded-xl p-5 border ${card.border} cursor-default overflow-hidden`}
                                        style={{
                                            transitionDelay: `${i * 80}ms`,
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                            transition: `all 0.5s cubic-bezier(0.23,1,0.32,1) ${400 + i * 80}ms`,
                                        }}
                                    >
                                        {/* Card glow on hover */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-xl"
                                            style={{ background: `radial-gradient(circle at 50% 50%, ${card.glow} 0%, transparent 70%)` }}
                                        />
                                        {/* Shimmer */}
                                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

                                        <div className="relative">
                                            <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon size={20} className={card.iconColor} />
                                            </div>
                                            <h3 className="text-white font-semibold text-sm mb-1">{card.title}</h3>
                                            <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
