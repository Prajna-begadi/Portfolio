import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Award, Star } from 'lucide-react';

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

interface Achievement {
    id: string;
    emoji: string;
    icon: React.ElementType;
    title: string;
    subtitle: string;
    desc: string;
    color: string;
    border: string;
    glow: string;
    iconColor: string;
    year: string;
}

const achievements: Achievement[] = [
    {
        id: 'chess-winner',
        emoji: '♟',
        icon: Trophy,
        title: 'Intercollege Chess Tournament',
        subtitle: 'Winner 🏆',
        desc: 'Claimed first place at the Intercollege Chess Tournament, demonstrating exceptional strategic thinking and competitive spirit.',
        color: 'from-yellow-500/15 via-amber-500/10 to-transparent',
        border: 'border-yellow-500/25',
        glow: 'rgba(245,158,11,0.3)',
        iconColor: 'text-yellow-400',
        year: '2024',
    },
    {
        id: 'chess-participant',
        emoji: '♙',
        icon: Award,
        title: 'Inter University Chess Tournament',
        subtitle: 'Participant',
        desc: 'Represented the university on a wider competitive stage, competing against talented players from across multiple universities.',
        color: 'from-slate-500/15 via-gray-500/10 to-transparent',
        border: 'border-slate-500/25',
        glow: 'rgba(148,163,184,0.2)',
        iconColor: 'text-slate-400',
        year: '2024',
    },
];

const Achievements: React.FC = () => {
    const ref = useRef<HTMLElement>(null!);
    const isVisible = useIntersection(ref);

    return (
        <section id="achievements" ref={ref} className="py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div
                    className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <p className="section-label mb-3">Beyond Code</p>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                        Achievements <span className="text-gradient">&amp; Awards</span>
                    </h2>
                    <div className="mt-4 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                </div>

                {/* Achievements */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {achievements.map((a, i) => {
                        const Icon = a.icon;
                        return (
                            <div
                                key={a.id}
                                id={`achievement-${a.id}`}
                                className="group relative glass-card rounded-2xl overflow-hidden cursor-default"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
                                    transition: `all 0.7s cubic-bezier(0.23,1,0.32,1) ${300 + i * 150}ms`,
                                }}
                            >
                                {/* Glowing border effect on hover */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        boxShadow: `0 0 40px ${a.glow}, inset 0 0 40px ${a.glow}40`,
                                    }}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
                                <div className={`absolute inset-0 rounded-2xl border ${a.border} pointer-events-none`} />

                                <div className="relative p-8">
                                    {/* Top row */}
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-400 shadow-inner">
                                                {a.emoji}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`${a.iconColor} flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]`}>
                                                <Icon size={13} />
                                                {a.year}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-white font-bold font-display text-lg mb-1 leading-tight">{a.title}</h3>
                                    <div className={`flex items-center gap-1.5 mb-3`}>
                                        <Star size={13} className={a.iconColor} fill="currentColor" />
                                        <span className={`font-semibold text-sm ${a.iconColor}`}>{a.subtitle}</span>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed">{a.desc}</p>

                                    {/* Bottom accent */}
                                    <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center gap-2">
                                        <div className={`h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${a.iconColor}`} />
                                        <span className="text-xs text-slate-600 font-medium">Chess</span>
                                        <div className={`h-1 flex-1 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${a.iconColor}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Fun stat strip */}
                <div
                    className={`mt-16 glass-card rounded-2xl p-8 max-w-4xl mx-auto transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <div className="grid grid-cols-3 gap-8 text-center">
                        {[
                            { value: '♟', label: 'Chess Competitor', sub: 'Strategic Thinker' },
                            { value: '4+', label: 'Projects Built', sub: 'Production-Grade' },
                            { value: '10+', label: 'Technologies', sub: 'Mastered' },
                        ].map(stat => (
                            <div key={stat.label} className="flex flex-col items-center gap-1">
                                <span className="text-3xl font-bold font-display text-gradient">{stat.value}</span>
                                <span className="text-white text-sm font-semibold">{stat.label}</span>
                                <span className="text-slate-600 text-xs">{stat.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
