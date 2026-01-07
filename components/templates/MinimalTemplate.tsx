import React from 'react';
import { ResumeData } from '../../types';

export const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-white text-gray-800 p-12 font-mono text-sm">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-1">{data.personal.fullName}</h1>
        <div className="text-gray-500 mb-4">{data.personal.jobTitle}</div>
        <div className="text-xs text-gray-500 space-y-1">
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.website && <div>{data.personal.website}</div>}
          {data.personal.address && <div>{data.personal.address}</div>}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Col */}
        <div className="col-span-4 space-y-8">
           <section>
            <h3 className="font-bold text-black mb-3 text-xs uppercase tracking-wider">Education</h3>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="font-medium">{edu.institution}</div>
                  <div className="text-gray-500 text-xs">{edu.degree}</div>
                  <div className="text-gray-400 text-xs mt-1">{edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-black mb-3 text-xs uppercase tracking-wider">Skills</h3>
            <ul className="space-y-1">
              {data.skills.map(skill => (
                <li key={skill.id} className="text-gray-600">{skill.name}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Col */}
        <div className="col-span-8 space-y-10">
           {data.personal.summary && (
            <section>
              <h3 className="font-bold text-black mb-3 text-xs uppercase tracking-wider">About</h3>
              <p className="text-gray-600 leading-relaxed">{data.personal.summary}</p>
            </section>
           )}

           <section>
            <h3 className="font-bold text-black mb-6 text-xs uppercase tracking-wider">Work Experience</h3>
            <div className="space-y-8">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative pl-6 border-l border-gray-200">
                  <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold">{exp.company}</div>
                    <div className="text-xs text-gray-400 font-medium">{exp.startDate} - {exp.endDate}</div>
                  </div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{exp.position}</div>
                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
           </section>
        </div>
      </div>
    </div>
  );
};