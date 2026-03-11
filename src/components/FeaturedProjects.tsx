import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Layers } from 'lucide-react';

const useIntersection = (ref: React.RefObject<Element>) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.05 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return isVisible;
};

interface Project {
    id: string;
    title: string;
    description: string;
    longDesc: string;
    emoji: string;
    gradient: string;
    border: string;
    glow: string;
    tech: string[];
    github?: string;
    featured: boolean;
    status: string;
}

const projects: Project[] = [
    {
        id: 'brevi',
        title: 'Brevi',
        description: 'Anonymous Microblogging App',
        longDesc: 'A privacy-first microblogging platform where users can share thoughts anonymously. Features real-time updates, topic-based feeds, and a modern responsive UI.',
        emoji: '🔏',
        gradient: 'from-violet-600/20 via-purple-600/10 to-transparent',
        border: 'border-violet-500/25',
        glow: 'rgba(139,92,246,0.25)',
        tech: ['React', 'Firebase', 'TypeScript', 'Tailwind'],
        github: 'https://github.com/Prajna-begadi',
        featured: true,
        status: 'Live',
    },
    {
        id: 'programming-platform',
        title: 'Programming Learning Platform',
        description: 'Interactive Coding Education Hub',
        longDesc: 'A comprehensive learning platform for programming education. Features structured courses, live code execution, progress tracking, and interactive exercises.',
        emoji: '💻',
        gradient: 'from-cyan-600/20 via-blue-600/10 to-transparent',
        border: 'border-cyan-500/25',
        glow: 'rgba(6,182,212,0.25)',
        tech: ['React', 'Next.js', 'Supabase', 'FastAPI'],
        github: 'https://github.com/Prajna-begadi',
        featured: true,
        status: 'In Progress',
    },
    {
        id: 'talento',
        title: 'Talento Vision',
        description: 'AI Career Intelligence Platform',
        longDesc: 'An AI-powered career guidance tool that analyzes skills, matches job opportunities, and provides personalised career roadmaps using advanced ML models.',
        emoji: '🤖',
        gradient: 'from-emerald-600/20 via-green-600/10 to-transparent',
        border: 'border-emerald-500/25',
        glow: 'rgba(16,185,129,0.25)',
        tech: ['Python', 'FastAPI', 'React', 'AI/ML', 'PostgreSQL'],
        github: 'https://github.com/Prajna-begadi',
        featured: true,
        status: 'Completed',
    },
    {
        id: 'lenselingo',
        title: 'LenseLingo',
        description: 'Multilingual Translation App',
        longDesc: 'A mobile-first multilingual translation app leveraging OCR and neural translation models. Users can translate text from images, audio, or direct input across 50+ languages.',
        emoji: '🌍',
        gradient: 'from-rose-600/20 via-pink-600/10 to-transparent',
        border: 'border-rose-500/25',
        glow: 'rgba(244,63,94,0.25)',
        tech: ['Flutter', 'Python', 'ML Kit', 'Firebase'],
        github: 'https://github.com/Prajna-begadi',
        featured: true,
        status: 'Completed',
    },
];

interface ProjectCardProps {
    project: Project;
    delay: number;
    isVisible: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay, isVisible }) => {
    const [tiltStyle, setTiltStyle] = useState({});
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -6;
        const rotateY = ((x - cx) / cx) * 6;
        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`,
        });
    };

    const handleMouseLeave = () => {
        setTiltStyle({ transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)', transition: 'transform 0.4s ease' });
    };

    const statusColor = {
        'Live': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        'In Progress': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
        'Completed': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    }[project.status] || 'text-slate-400 bg-slate-400/10 border-slate-400/20';

    return (
        <div
            ref={cardRef}
            className="group relative glass-card rounded-2xl overflow-hidden cursor-default"
            style={{
                border: `1px solid ${project.border.replace('border-', '').replace('/25', '')}`,
                borderColor: 'rgba(255,255,255,0.06)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}ms, box-shadow 0.4s ease`,
                ...tiltStyle,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glow border */}
            <div
                className={`absolute inset-0 rounded-2xl border ${project.border} pointer-events-none`}
            />

            {/* Hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${project.glow} 0%, transparent 60%)` }}
            />

            {/* Top gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            {/* Card content */}
            <div className="relative p-7">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            {project.emoji}
                        </div>
                        <div>
                            <h3 className="text-white font-bold font-display text-lg leading-tight">{project.title}</h3>
                            <p className="text-slate-500 text-xs mt-0.5">{project.description}</p>
                        </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium flex-shrink-0 ${statusColor}`}>
                        {project.status}
                    </span>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
                    {project.longDesc}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                        <span key={t} className="tech-badge">{t}</span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group/btn"
                            id={`project-github-${project.id}`}
                        >
                            <Github size={16} className="group-hover/btn:scale-110 transition-transform" />
                            <span>View Code</span>
                        </a>
                    )}
                    <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-600">
                        <Layers size={12} />
                        <span>{project.tech.length} technologies</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturedProjects: React.FC = () => {
    const ref = useRef<HTMLElement>(null!);
    const isVisible = useIntersection(ref);

    return (
        <section id="projects" ref={ref} className="py-28 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div
                    className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <p className="section-label mb-3">What I've Built</p>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <div className="mt-4 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <p className="text-slate-500 mt-5 max-w-lg mx-auto text-sm leading-relaxed">
                        A selection of projects I'm proud of — each solving real problems with thoughtful design and robust engineering.
                    </p>
                </div>

                {/* Projects grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            delay={200 + i * 120}
                            isVisible={isVisible}
                        />
                    ))}
                </div>

                {/* View all CTA */}
                <div
                    className={`text-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    <a
                        href="https://github.com/Prajna-begadi"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="view-all-projects-btn"
                        className="inline-flex items-center gap-2 btn-outline text-sm px-6 py-3"
                    >
                        <Github size={16} />
                        View All Projects on GitHub
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
