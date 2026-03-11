import React, { useEffect, useRef, useState } from 'react';

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

interface SkillItem {
    name: string;
    icon: string;
    level: number;
}

interface SkillCategory {
    category: string;
    icon: string;
    color: string;
    glow: string;
    border: string;
    skills: SkillItem[];
}

const skillData: SkillCategory[] = [
    {
        category: 'Languages',
        icon: '{ }',
        color: 'from-violet-500/15 to-purple-500/5',
        glow: 'rgba(139,92,246,0.2)',
        border: 'border-violet-500/20',
        skills: [
            { name: 'Python', icon: '🐍', level: 90 },
            { name: 'JavaScript', icon: '⚡', level: 85 },
            { name: 'TypeScript', icon: '📘', level: 80 },
            { name: 'SQL', icon: '🗃️', level: 75 },
        ],
    },
    {
        category: 'Frontend',
        icon: '◈',
        color: 'from-cyan-500/15 to-blue-500/5',
        glow: 'rgba(6,182,212,0.2)',
        border: 'border-cyan-500/20',
        skills: [
            { name: 'React', icon: '⚛', level: 88 },
            { name: 'Next.js', icon: '▲', level: 78 },
            { name: 'HTML/CSS', icon: '🎨', level: 92 },
            { name: 'Tailwind', icon: '🌊', level: 85 },
        ],
    },
    {
        category: 'Backend',
        icon: '⚙',
        color: 'from-emerald-500/15 to-green-500/5',
        glow: 'rgba(16,185,129,0.2)',
        border: 'border-emerald-500/20',
        skills: [
            { name: 'FastAPI', icon: '🚀', level: 82 },
            { name: 'Firebase', icon: '🔥', level: 80 },
            { name: 'Supabase', icon: '⚡', level: 75 },
            { name: 'Node.js', icon: '🟢', level: 70 },
        ],
    },
    {
        category: 'Mobile',
        icon: '📱',
        color: 'from-rose-500/15 to-pink-500/5',
        glow: 'rgba(244,63,94,0.2)',
        border: 'border-rose-500/20',
        skills: [
            { name: 'Flutter', icon: '🦋', level: 80 },
            { name: 'Android Dev', icon: '🤖', level: 72 },
        ],
    },
    {
        category: 'Cloud & Tools',
        icon: '☁',
        color: 'from-amber-500/15 to-yellow-500/5',
        glow: 'rgba(245,158,11,0.2)',
        border: 'border-amber-500/20',
        skills: [
            { name: 'AWS', icon: '☁️', level: 68 },
            { name: 'Git/GitHub', icon: '🐙', level: 88 },
            { name: 'VS Code', icon: '💎', level: 95 },
            { name: 'Linux', icon: '🐧', level: 72 },
        ],
    },
];

const SkillCard: React.FC<{ skill: SkillItem; isVisible: boolean; delay: number }> = ({ skill, isVisible, delay }) => {
    const [barWidth, setBarWidth] = useState(0);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setBarWidth(skill.level), delay + 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, skill.level, delay]);

    return (
        <div
            className="group flex flex-col gap-2 p-3 rounded-xl hover:bg-white/[0.03] transition-all duration-300 cursor-default"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: `all 0.5s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium">{skill.name}</span>
                </div>
                <span className="text-xs text-slate-600 font-mono">{skill.level}%</span>
            </div>
            {/* Progress bar */}
            <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                    style={{ width: `${barWidth}%` }}
                />
            </div>
        </div>
    );
};

const Skills: React.FC = () => {
    const ref = useRef<HTMLElement>(null!);
    const isVisible = useIntersection(ref);

    return (
        <section id="skills" ref={ref} className="py-28 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div
                    className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <p className="section-label mb-3">What I Use</p>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                        Tech <span className="text-gradient">Stack</span>
                    </h2>
                    <div className="mt-4 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <p className="text-slate-500 mt-5 max-w-md mx-auto text-sm leading-relaxed">
                        A curated set of tools I use to craft high-quality, production-ready software.
                    </p>
                </div>

                {/* Skills grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillData.map((cat, ci) => (
                        <div
                            key={cat.category}
                            className={`group relative glass-card rounded-2xl p-6 border ${cat.border} overflow-hidden`}
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: `all 0.6s cubic-bezier(0.23,1,0.32,1) ${200 + ci * 100}ms`,
                            }}
                        >
                            {/* Glow effect on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                                style={{ background: `radial-gradient(circle at 50% 0%, ${cat.glow} 0%, transparent 70%)` }}
                            />
                            {/* Gradient bg */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                            {/* Category header */}
                            <div className="relative flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                                    <span className="text-xs font-mono text-slate-400 font-bold">{cat.icon}</span>
                                </div>
                                <h3 className="text-white font-semibold font-display">{cat.category}</h3>
                                <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:scale-150 transition-transform`} />
                            </div>

                            {/* Skill items */}
                            <div className="relative space-y-1">
                                {cat.skills.map((skill, si) => (
                                    <SkillCard
                                        key={skill.name}
                                        skill={skill}
                                        isVisible={isVisible}
                                        delay={400 + ci * 100 + si * 80}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
