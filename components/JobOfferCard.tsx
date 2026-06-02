import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Banknote, FileText, Code2, CheckCircle2, ArrowRight } from 'lucide-react';
import { GlassCard, Tag } from './UI';

export interface JobOffer {
    title: string;
    tags: string[];
    salary: string;
    location: string;
    contract: string;
    description: string;
    techStack: string[];
    responsibilities: string[];
    requirements?: string[];
    niceToHave?: string[];
    benefits?: string[];
    applyUrl?: string;
}

interface JobOfferCardProps {
    offer: JobOffer;
    isActive: boolean;
    onToggle: () => void;
    onApply: () => void;
}

export const JobOfferCard: React.FC<JobOfferCardProps> = ({ offer, isActive, onToggle, onApply }) => {
    const handleApplyClick = () => {
        if (offer.applyUrl) {
            window.open(offer.applyUrl, '_blank', 'noopener,noreferrer');
        } else {
            onApply();
        }
    };

    return (
        <GlassCard className={`group transition-all duration-300 ${isActive ? 'border-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.1)]' : 'hover:border-lime-400/50'}`} noHover>
            <div
                className="flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
                onClick={onToggle}
            >
                <div className="flex-1">
                    <h3 className={`text-xl md:text-2xl font-bold transition-colors tracking-wide flex items-center gap-3 ${isActive ? 'text-lime-400' : 'text-white group-hover:text-emerald-200'}`}>
                        {offer.title}
                        {isActive && <span className="text-xs font-hand text-emerald-400 border border-emerald-500/50 px-2 py-0.5 rounded-full">Rekrutujemy</span>}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {offer.tags.map(t => <Tag key={t}>{t}</Tag>)}
                    </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 min-w-[200px]">
                    <div className="text-right hidden md:block">
                        <p className="text-sm text-emerald-400 font-bold">{offer.salary}</p>
                        <p className="text-xs text-emerald-500/60">{offer.contract}</p>
                    </div>
                    <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        className={`p-2 rounded-full border-2 ${isActive ? 'border-lime-400 bg-lime-400/10 text-lime-400' : 'border-emerald-800 text-emerald-600'}`}
                    >
                        <ChevronDown size={24} />
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-8 border-t border-dashed border-emerald-800/50 mt-6 grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <h4 className="text-lime-400 font-hand text-xl font-bold mb-2 flex items-center gap-2">
                                        <FileText size={18} /> O projekcie
                                    </h4>
                                    <p className="text-emerald-100/80 leading-relaxed">{offer.description}</p>
                                </div>

                                <div>
                                    <h4 className="text-lime-400 font-hand text-xl font-bold mb-3 flex items-center gap-2">
                                        <CheckCircle2 size={18} /> Twoje zadania
                                    </h4>
                                    <ul className="space-y-2">
                                        {offer.responsibilities.map((task, idx) => (
                                            <li key={idx} className="flex items-start text-emerald-200/90 text-sm">
                                                <span className="w-1.5 h-1.5 bg-lime-500 rounded-full mt-2 mr-3 shrink-0" />
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {offer.requirements && offer.requirements.length > 0 && (
                                    <div>
                                        <h4 className="text-lime-400 font-hand text-xl font-bold mb-3 flex items-center gap-2">
                                            <CheckCircle2 size={18} /> Nasze wymagania
                                        </h4>
                                        <ul className="space-y-2">
                                            {offer.requirements.map((req, idx) => (
                                                <li key={idx} className="flex items-start text-emerald-200/90 text-sm">
                                                    <span className="w-1.5 h-1.5 bg-lime-500 rounded-full mt-2 mr-3 shrink-0" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {offer.niceToHave && offer.niceToHave.length > 0 && (
                                    <div>
                                        <h4 className="text-lime-400 font-hand text-xl font-bold mb-3 flex items-center gap-2">
                                            <CheckCircle2 size={18} /> Mile widziane
                                        </h4>
                                        <ul className="space-y-2">
                                            {offer.niceToHave.map((nice, idx) => (
                                                <li key={idx} className="flex items-start text-emerald-200/90 text-sm">
                                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 shrink-0" />
                                                    {nice}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {offer.benefits && offer.benefits.length > 0 && (
                                    <div>
                                        <h4 className="text-lime-400 font-hand text-xl font-bold mb-3 flex items-center gap-2">
                                            <CheckCircle2 size={18} /> Oferujemy
                                        </h4>
                                        <ul className="space-y-2">
                                            {offer.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start text-emerald-200/90 text-sm">
                                                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full mt-2 mr-3 shrink-0" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="pt-4">
                                    <button
                                        onClick={handleApplyClick}
                                        className="w-full md:w-auto px-8 py-3 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(132,204,22,0.3)] flex justify-center items-center gap-2"
                                    >
                                        Aplikuj teraz <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-emerald-900/30 p-6 rounded-2xl border border-emerald-800/50 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="text-lime-400 mt-1" size={20} />
                                        <div>
                                            <p className="text-xs text-emerald-500 uppercase font-bold">Lokalizacja</p>
                                            <p className="text-emerald-100 font-semibold">{offer.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Banknote className="text-lime-400 mt-1" size={20} />
                                        <div>
                                            <p className="text-xs text-emerald-500 uppercase font-bold">Wynagrodzenie</p>
                                            <p className="text-emerald-100 font-semibold">{offer.salary}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <FileText className="text-lime-400 mt-1" size={20} />
                                        <div>
                                            <p className="text-xs text-emerald-500 uppercase font-bold">Umowa</p>
                                            <p className="text-emerald-100 font-semibold">{offer.contract}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lime-400 font-hand text-lg font-bold mb-3 flex items-center gap-2">
                                        <Code2 size={18} /> Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {offer.techStack.map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-emerald-950 border border-emerald-700/50 rounded text-xs font-mono text-emerald-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GlassCard>
    );
};
