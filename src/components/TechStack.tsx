import React from 'react';
import { Layers, Database, Globe, Smartphone, Server } from 'lucide-react';

const techCategories = [
    {
        title: 'Languages',
        icon: <Globe className="text-blue-400" />,
        skills: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Java']
    },
    {
        title: 'Frontend',
        icon: <Layers className="text-pink-400" />,
        skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion']
    },
    {
        title: 'Backend',
        icon: <Server className="text-green-400" />,
        skills: ['Node.js', 'Express', 'FastAPI', 'Django']
    },
    {
        title: 'Database',
        icon: <Database className="text-yellow-400" />,
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase']
    },
    {
        title: 'Mobile Development',
        icon: <Smartphone className="text-purple-400" />,
        skills: ['React Native', 'Flutter', 'Expo']
    }
];

const TechStack = () => {
    return (
        <section id="tech" className="py-24 relative overflow-hidden bg-surface">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 inline-block">
                        Tech Ecosystem
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Tools and technologies I use to build robust and scalable systems.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {techCategories.map((category, idx) => (
                        <div key={idx} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/50 group flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                {category.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">{category.title}</h3>
                            <ul className="space-y-2 w-full">
                                {category.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="text-gray-400 text-sm py-1.5 px-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors w-full">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
