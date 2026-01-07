import React from 'react';
import { ResumeData } from '../../types';

export const ATSTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-white text-black font-sans text-sm leading-normal p-12">
      {/* 
        ATS FRIENDLY GUIDELINES:
        1. Single column layout only.
        2. Standard system fonts (Arial/Helvetica).
        3. No icons or graphics that can confuse parsers.
        4. Clear, standard section headings.
        5. Minimal formatting (bold/caps only for hierarchy).
      */}
      <style>{`
        .ats-resume { font-family: Arial, Helvetica, sans-serif; }
      `}</style>
      
      <div className="ats-resume max-w-[800px] mx-auto">
        {/* Header - Centered for ATS readability */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold uppercase mb-2 text-black">{data.personal.fullName}</h1>
          <div className="text-sm text-black mb-1">
            {[
              data.personal.address,
              data.personal.email,
              data.personal.phone,
              data.personal.website
            ].filter(Boolean).join(' | ')}
          </div>
        </div>

        {/* Professional Summary */}
        {data.personal.summary && (
          <div className="mb-6">
            <h2 className="font-bold text-sm uppercase border-b border-black mb-2 pb-0.5">Professional Summary</h2>
            <p className="text-justify">{data.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        <div className="mb-6">
          <h2 className="font-bold text-sm uppercase border-b border-black mb-3 pb-0.5">Experience</h2>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-base">{exp.company}</span>
                  <span className="font-bold whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="italic mb-1">{exp.position}</div>
                <div className="whitespace-pre-line pl-4">{exp.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="font-bold text-sm uppercase border-b border-black mb-3 pb-0.5">Education</h2>
          <div className="space-y-2">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{edu.institution}</div>
                  <div>{edu.degree}</div>
                </div>
                <div className="font-bold text-right">{edu.startDate} – {edu.endDate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills - Simple List for Parsing */}
        <div className="mb-6">
          <h2 className="font-bold text-sm uppercase border-b border-black mb-2 pb-0.5">Skills</h2>
          <div className="text-sm">
             {data.skills.map(skill => skill.name).join(', ')}
          </div>
        </div>

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="font-bold text-sm uppercase border-b border-black mb-3 pb-0.5">Projects</h2>
            <div className="space-y-3">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="font-bold">
                    {proj.name} 
                    {proj.link && <span className="font-normal text-gray-700 ml-1">({proj.link})</span>}
                  </div>
                  <p className="text-sm">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};