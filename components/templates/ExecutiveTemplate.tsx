import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-white text-slate-800 font-sans flex flex-col">
      {/* Heavy Header */}
      <div className="bg-slate-900 text-white px-12 py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex justify-between items-end border-b border-slate-700 pb-6 mb-6">
            <div>
                <h1 className="text-4xl font-serif font-bold tracking-wide mb-2 text-white">{data.personal.fullName}</h1>
                <p className="text-amber-500 font-medium tracking-widest uppercase text-sm">{data.personal.jobTitle}</p>
            </div>
            <div className="text-right space-y-1 text-sm text-slate-400">
                 {data.personal.email && <div className="flex items-center justify-end gap-2">{data.personal.email}</div>}
                 {data.personal.phone && <div className="flex items-center justify-end gap-2">{data.personal.phone}</div>}
            </div>
        </div>
        <div className="flex gap-6 text-xs text-slate-400 font-medium">
             {data.personal.address && <div className="flex items-center gap-1"><MapPin size={12} className="text-amber-500"/> {data.personal.address}</div>}
             {data.personal.website && <div className="flex items-center gap-1"><Globe size={12} className="text-amber-500"/> {data.personal.website}</div>}
        </div>
      </div>

      <div className="flex-1 px-12 py-8 grid grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="col-span-8 space-y-8">
            {data.personal.summary && (
            <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-amber-500 inline-block mb-4 pb-1">Professional Profile</h2>
                <p className="text-slate-600 leading-relaxed text-sm text-justify">{data.personal.summary}</p>
            </section>
            )}

            <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-amber-500 inline-block mb-6 pb-1">Experience</h2>
                <div className="space-y-6">
                    {data.experience.map(exp => (
                        <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-slate-800 text-lg">{exp.position}</h3>
                                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{exp.startDate} — {exp.endDate}</span>
                            </div>
                            <div className="text-slate-500 font-serif italic mb-2">{exp.company}</div>
                            <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

             {data.projects.length > 0 && (
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-amber-500 inline-block mb-6 pb-1">Key Projects</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {data.projects.map(proj => (
                            <div key={proj.id} className="bg-slate-50 p-4 rounded-sm border-l-2 border-slate-300">
                                <h3 className="font-bold text-slate-800 text-sm mb-1">{proj.name}</h3>
                                {proj.link && <a href={`https://${proj.link}`} className="text-amber-600 text-xs hover:underline block mb-2">{proj.link}</a>}
                                <p className="text-xs text-slate-600">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-8 border-l border-slate-100 pl-8">
            <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 block mb-4 pb-1">Education</h2>
                <div className="space-y-4">
                    {data.education.map(edu => (
                        <div key={edu.id}>
                            <h3 className="font-bold text-slate-800 text-sm">{edu.institution}</h3>
                            <div className="text-slate-600 text-sm">{edu.degree}</div>
                            <div className="text-xs text-slate-400 mt-1">{edu.startDate} — {edu.endDate}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 block mb-4 pb-1">Expertise</h2>
                <div className="flex flex-col gap-2">
                    {data.skills.map(skill => (
                        <div key={skill.id} className="flex justify-between items-center text-sm">
                            <span className="font-medium text-slate-700">{skill.name}</span>
                            <span className="text-xs text-slate-400">{skill.level}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};