import React from 'react';
import { ResumeData } from '../../types';

export const AcademicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-white text-gray-900 p-12 font-serif leading-relaxed">
       {/* 
        ACADEMIC STYLE:
        1. Serif fonts (Times New Roman / Georgia).
        2. Conservative layout.
        3. Education often comes first.
        4. Dense text allowed.
      */}
      <style>{`
        .academic-resume { font-family: Georgia, 'Times New Roman', Times, serif; }
      `}</style>

      <div className="academic-resume">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">{data.personal.fullName}</h1>
          <div className="flex flex-col text-sm space-y-1">
             <div className="flex justify-center gap-4 flex-wrap">
                {data.personal.address && <span>{data.personal.address}</span>}
                {data.personal.phone && <span>{data.personal.phone}</span>}
                {data.personal.email && <span>{data.personal.email}</span>}
             </div>
             {data.personal.website && <div className="text-blue-800 underline">{data.personal.website}</div>}
          </div>
        </div>

        {/* Education - Academic CVs typically lead with this */}
        <section className="mb-6">
          <h2 className="font-bold text-sm uppercase border-b-2 border-gray-300 mb-4 pb-1">Education</h2>
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between">
                <div>
                   <div className="font-bold text-lg">{edu.institution}</div>
                   <div className="italic">{edu.degree}</div>
                   {edu.description && <div className="text-sm mt-1 text-gray-700">{edu.description}</div>}
                </div>
                <div className="text-right whitespace-nowrap font-medium">{edu.startDate} – {edu.endDate}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="font-bold text-sm uppercase border-b-2 border-gray-300 mb-4 pb-1">Professional Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                   <h3 className="font-bold text-lg">{exp.company}</h3>
                   <span className="italic">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="italic font-medium mb-2">{exp.position}</div>
                <p className="text-sm leading-relaxed whitespace-pre-line pl-4 text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

         {/* Research / Projects */}
         {data.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="font-bold text-sm uppercase border-b-2 border-gray-300 mb-4 pb-1">Projects & Research</h2>
            <div className="space-y-4">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-base">{proj.name}</span>
                    {proj.link && <span className="text-sm text-blue-800 italic">[{proj.link}]</span>}
                  </div>
                  <p className="text-sm text-justify">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section>
          <h2 className="font-bold text-sm uppercase border-b-2 border-gray-300 mb-4 pb-1">Technical Skills & Languages</h2>
          <ul className="list-disc list-outside ml-5 text-sm grid grid-cols-2 gap-x-8 gap-y-1">
            {data.skills.map(skill => (
              <li key={skill.id} className="pl-1">
                <span className="font-medium">{skill.name}</span> <span className="text-gray-600 text-xs">({skill.level})</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};