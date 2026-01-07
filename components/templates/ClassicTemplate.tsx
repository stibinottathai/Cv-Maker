import React from 'react';
import { ResumeData } from '../../types';

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-white text-gray-900 p-10 font-serif leading-relaxed">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">{data.personal.fullName}</h1>
        <div className="text-sm text-gray-600 space-x-3 flex justify-center flex-wrap">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.address && <span>• {data.personal.address}</span>}
          {data.personal.website && <span>• {data.personal.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personal.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">Professional Summary</h2>
          <p className="text-sm text-justify">{data.personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-300 pb-1">Experience</h2>
        <div className="space-y-5">
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-sm">
                <span>{exp.company}</span>
                <span className="italic font-normal">{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className="text-sm italic mb-2">{exp.position}</div>
              <p className="text-sm whitespace-pre-line pl-4 border-l-2 border-gray-100">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-300 pb-1">Education</h2>
        <div className="space-y-3">
          {data.education.map(edu => (
            <div key={edu.id} className="flex justify-between text-sm">
              <div>
                <span className="font-bold block">{edu.institution}</span>
                <span className="italic">{edu.degree}</span>
              </div>
              <span className="italic">{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">Skills</h2>
        <p className="text-sm">
          {data.skills.map(skill => skill.name).join(' • ')}
        </p>
      </section>
    </div>
  );
};