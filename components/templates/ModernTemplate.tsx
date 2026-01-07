import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-white text-gray-800 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-slate-800 text-white p-8">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{data.personal.fullName}</h1>
        <p className="text-xl text-blue-300 font-medium mb-6">{data.personal.jobTitle}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          {data.personal.email && <div className="flex items-center gap-2"><Mail size={14}/> {data.personal.email}</div>}
          {data.personal.phone && <div className="flex items-center gap-2"><Phone size={14}/> {data.personal.phone}</div>}
          {data.personal.address && <div className="flex items-center gap-2"><MapPin size={14}/> {data.personal.address}</div>}
          {data.personal.website && <div className="flex items-center gap-2"><Globe size={14}/> {data.personal.website}</div>}
        </div>
      </div>

      <div className="flex flex-1 p-8 gap-8">
        {/* Left Column (Main) */}
        <div className="flex-[2] space-y-8">
          {/* Summary */}
          {data.personal.summary && (
            <section>
              <h2 className="text-lg font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-3">Profile</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{data.personal.summary}</p>
            </section>
          )}

          {/* Experience */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-4">Experience</h2>
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-sm text-gray-500 font-medium">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-blue-600 font-medium text-sm mb-2">{exp.company}</div>
                  <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

           {/* Projects */}
           {data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-800 uppercase border-b-2 border-blue-500 pb-1 mb-4">Projects</h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-gray-800">{proj.name}</h3>
                    {proj.link && <a href={`https://${proj.link}`} className="text-blue-500 text-xs hover:underline block mb-1">{proj.link}</a>}
                    <p className="text-sm text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar style) */}
        <div className="flex-1 space-y-8">
           {/* Education */}
           <section>
            <h2 className="text-lg font-bold text-slate-800 uppercase border-b-2 border-gray-300 pb-1 mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                   <h3 className="font-bold text-gray-800 text-sm">{edu.institution}</h3>
                   <div className="text-sm text-gray-600">{edu.degree}</div>
                   <div className="text-xs text-gray-400 mt-1">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 uppercase border-b-2 border-gray-300 pb-1 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(skill => (
                <span key={skill.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};