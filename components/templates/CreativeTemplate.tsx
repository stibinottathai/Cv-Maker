import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="h-full w-full bg-white text-gray-800 font-sans flex">
       {/* Left Colored Sidebar */}
       <div className="w-[35%] bg-stone-100 h-full p-8 flex flex-col gap-8 border-r border-stone-200">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold tracking-tighter mb-4 shadow-lg shadow-emerald-200">
              {getInitials(data.personal.fullName)}
          </div>
          
          <div className="space-y-4">
             <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">Contact</h3>
             <div className="space-y-3 text-sm text-stone-600">
                {data.personal.email && <div className="flex items-center gap-3"><Mail size={16}/> <span className="break-all">{data.personal.email}</span></div>}
                {data.personal.phone && <div className="flex items-center gap-3"><Phone size={16}/> {data.personal.phone}</div>}
                {data.personal.address && <div className="flex items-center gap-3"><MapPin size={16}/> {data.personal.address}</div>}
                {data.personal.website && <div className="flex items-center gap-3"><Globe size={16}/> <span className="break-all">{data.personal.website}</span></div>}
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">Education</h3>
             <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-stone-800 text-sm">{edu.degree}</div>
                    <div className="text-stone-600 text-sm mb-1">{edu.institution}</div>
                    <div className="text-xs text-stone-400 font-medium">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">Skills</h3>
             <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <span key={skill.id} className="bg-white border border-stone-200 text-stone-700 px-3 py-1.5 text-xs font-semibold rounded shadow-sm">
                    {skill.name}
                  </span>
                ))}
             </div>
          </div>
       </div>

       {/* Right Main Content */}
       <div className="flex-1 p-10 flex flex-col gap-10">
          <header>
             <h1 className="text-5xl font-black text-stone-900 leading-none mb-3 tracking-tight">{data.personal.fullName}</h1>
             <p className="text-xl text-emerald-600 font-medium">{data.personal.jobTitle}</p>
          </header>

          {data.personal.summary && (
            <section>
               <p className="text-lg text-stone-600 leading-relaxed font-light">{data.personal.summary}</p>
            </section>
          )}

          <section>
             <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                Work Experience
                <div className="h-1 bg-stone-200 flex-1 rounded"></div>
             </h2>
             <div className="space-y-8">
                {data.experience.map(exp => (
                    <div key={exp.id} className="group">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-xl font-bold text-stone-800">{exp.position}</h3>
                            <span className="text-sm font-medium text-stone-400">{exp.startDate} – {exp.endDate}</span>
                        </div>
                        <div className="text-emerald-600 font-medium mb-3 text-sm tracking-wide uppercase">{exp.company}</div>
                        <p className="text-stone-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    </div>
                ))}
             </div>
          </section>

          {data.projects.length > 0 && (
             <section>
               <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                  Projects
                  <div className="h-1 bg-stone-200 flex-1 rounded"></div>
               </h2>
               <div className="grid grid-cols-2 gap-6">
                  {data.projects.map(proj => (
                    <div key={proj.id} className="bg-stone-50 p-5 rounded-xl hover:bg-emerald-50 transition-colors cursor-default">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-bold text-stone-800">{proj.name}</h3>
                           {proj.link && <ExternalLink size={14} className="text-emerald-500" />}
                        </div>
                        <p className="text-sm text-stone-600 line-clamp-3">{proj.description}</p>
                    </div>
                  ))}
               </div>
             </section>
          )}
       </div>
    </div>
  );
};