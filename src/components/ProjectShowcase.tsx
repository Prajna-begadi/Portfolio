import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const otherProjects = [
    {
        title: 'Minimalist Portfolio v1',
        description: 'A previous iteration of my portfolio built with plain HTML, CSS, and vanilla JS, focusing on layout simplicity.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        github: '#'
    },
    {
        title: 'Weather Dashboard',
        description: 'A dynamic weather application using OpenWeather API to provide real-time updates and forecasts based on location.',
        tech: ['React', 'API', 'Tailwind'],
        github: '#'
    },
    {
        title: 'Task Tracker CLI',
        description: 'A command-line task management tool that helps developers keep track of their daily tasks and technical debt.',
        tech: ['Python', 'Typer', 'SQLite'],
        github: '#'
    },
    {
        title: 'E-commerce UI Components',
        description: 'A collection of reusable, accessible e-commerce user interface components built following modern design guidelines.',
        tech: ['TypeScript', 'Storybook', 'Framer Motion'],
        github: '#'
    }
];

const ProjectShowcase = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-surface">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 inline-block mb-4">
                        Other Noteworthy Projects
                    </h2>
                    <p className="text-gray-400">Smaller experiments, tools, and past work.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {otherProjects.map((project, idx) => (
                        <div key={idx} className="glass-card p-6 rounded-xl flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-300">
                            <div>
                                <div className="flex justify-between items-center mb-6 text-gray-400">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Github className="text-primary group-hover:scale-110 transition-transform" size={20} />
                                    </div>
                                    <div className="flex gap-4">
                                        {project.github && <a href={project.github} className="hover:text-white transition-colors"><ExternalLink size={20} /></a>}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-200 mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">{project.description}</p>
                            </div>

                            <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                                {project.tech.map((t, i) => (
                                    <li key={i} className="text-xs font-mono text-gray-500">{t}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectShowcase;
