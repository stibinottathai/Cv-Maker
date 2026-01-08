import React from 'react';
import { ResumeData } from '../types';
import { Plus, Trash2, ChevronDown, ChevronUp, User, Briefcase, GraduationCap, Wrench, FolderKanban } from 'lucide-react';

interface EditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

type IconComponent = React.ComponentType<{ className?: string }>;

const SectionHeader: React.FC<{
  title: string;
  id: string;
  icon: IconComponent;
  activeSection: string;
  setActiveSection: (section: string) => void;
}> = ({ title, id, icon: Icon, activeSection, setActiveSection }) => (
  <button
    type="button"
    onClick={() => setActiveSection(activeSection === id ? '' : id)}
    className={`w-full flex items-center justify-between p-5 transition-all border-b border-slate-800/50 ${activeSection === id ? 'bg-slate-800 text-white' : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${activeSection === id ? 'text-blue-400' : 'text-slate-500'}`} />
      <span className="font-semibold text-sm tracking-wide">{title}</span>
    </div>
    {activeSection === id ? (
      <ChevronUp className="w-4 h-4 text-slate-500" />
    ) : (
      <ChevronDown className="w-4 h-4 text-slate-500" />
    )}
  </button>
);

const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => (
  <div className="group">
    <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1 group-focus-within:text-blue-400 transition-colors">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-slate-600"
    />
  </div>
);

const TextAreaField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div className="group">
    <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1 group-focus-within:text-blue-400 transition-colors">
      {label}
    </label>
    <textarea
      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-slate-600"
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export const Editor: React.FC<EditorProps> = ({ data, onChange, activeSection, setActiveSection }) => {
  
  const updatePersonal = (field: string, value: string) => {
    onChange({ ...data, personal: { ...data.personal, [field]: value } });
  };

  const updateArrayItem = <K extends 'experience' | 'education' | 'skills' | 'projects'>(
    section: K,
    id: string,
    field: keyof ResumeData[K][number],
    value: string
  ) => {
    const items = (data[section] as any[]).map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, [section]: items });
  };

  const addItem = (section: 'experience' | 'education' | 'skills' | 'projects') => {
    const newId = Date.now().toString();
    let newItem: any;
    
    if (section === 'experience') {
      newItem = { id: newId, company: '', position: '', startDate: '', endDate: '', description: '' };
    } else if (section === 'education') {
      newItem = { id: newId, institution: '', degree: '', startDate: '', endDate: '', description: '' };
    } else if (section === 'skills') {
      newItem = { id: newId, name: '', level: 'Intermediate' };
    } else if (section === 'projects') {
      newItem = { id: newId, name: '', link: '', description: '' };
    }

    onChange({ ...data, [section]: [...(data[section] as any[]), newItem] });
  };

  const removeItem = (section: keyof ResumeData, id: string) => {
    const items = (data[section] as any[]).filter(item => item.id !== id);
    onChange({ ...data, [section]: items });
  };

  return (
    <div className="bg-[#1a1f2c] h-full flex flex-col text-slate-300">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-tight">Editor</h2>
        <p className="text-slate-500 text-xs mt-1">Refine your professional details</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Personal Details */}
        <SectionHeader title="Personal Details" id="personal" icon={User} activeSection={activeSection} setActiveSection={setActiveSection} />
        {activeSection === 'personal' && (
          <div className="p-6 space-y-5 animate-in slide-in-from-top-2 duration-200 bg-slate-800/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Full Name" value={data.personal.fullName} onChange={(v: string) => updatePersonal('fullName', v)} />
              <InputField label="Job Title" value={data.personal.jobTitle} onChange={(v: string) => updatePersonal('jobTitle', v)} />
              <InputField label="Email" value={data.personal.email} onChange={(v: string) => updatePersonal('email', v)} />
              <InputField label="Phone" value={data.personal.phone} onChange={(v: string) => updatePersonal('phone', v)} />
              <div className="md:col-span-2">
                 <InputField label="Address" value={data.personal.address} onChange={(v: string) => updatePersonal('address', v)} />
              </div>
              <div className="md:col-span-2">
                 <InputField label="Website / LinkedIn" value={data.personal.website} onChange={(v: string) => updatePersonal('website', v)} />
              </div>
            </div>
            <TextAreaField
              label="Professional Summary"
              value={data.personal.summary}
              onChange={(val) => updatePersonal('summary', val)}
              placeholder="E.g. Senior Product Manager with 5 years..."
              rows={4}
            />
          </div>
        )}

        {/* Experience */}
        <SectionHeader title="Experience" id="experience" icon={Briefcase} activeSection={activeSection} setActiveSection={setActiveSection} />
        {activeSection === 'experience' && (
          <div className="p-6 space-y-6 animate-in slide-in-from-top-2 duration-200 bg-slate-800/20">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 relative group hover:border-slate-600 transition-colors">
                 <div className="absolute top-4 right-4 text-xs font-mono text-slate-600">#{index + 1}</div>
                <button
                  onClick={() => removeItem('experience', exp.id)}
                  className="absolute top-4 right-10 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <InputField label="Company" value={exp.company} onChange={(v: string) => updateArrayItem('experience', exp.id, 'company', v)} />
                  <InputField label="Position" value={exp.position} onChange={(v: string) => updateArrayItem('experience', exp.id, 'position', v)} />
                  <InputField label="Start Date" value={exp.startDate} onChange={(v: string) => updateArrayItem('experience', exp.id, 'startDate', v)} />
                  <InputField label="End Date" value={exp.endDate} onChange={(v: string) => updateArrayItem('experience', exp.id, 'endDate', v)} />
                </div>
                <TextAreaField
                  label="Description"
                  value={exp.description}
                  onChange={(val) => updateArrayItem('experience', exp.id, 'description', val)}
                  rows={3}
                />
              </div>
            ))}
            <button
              onClick={() => addItem('experience')}
              className="w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center gap-2 font-medium text-sm hover:bg-slate-800/50"
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        )}

        {/* Education */}
        <SectionHeader title="Education" id="education" icon={GraduationCap} activeSection={activeSection} setActiveSection={setActiveSection} />
        {activeSection === 'education' && (
          <div className="p-6 space-y-6 animate-in slide-in-from-top-2 duration-200 bg-slate-800/20">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 relative group hover:border-slate-600 transition-colors">
                 <button
                  onClick={() => removeItem('education', edu.id)}
                  className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <InputField label="Institution" value={edu.institution} onChange={(v: string) => updateArrayItem('education', edu.id, 'institution', v)} />
                  <InputField label="Degree" value={edu.degree} onChange={(v: string) => updateArrayItem('education', edu.id, 'degree', v)} />
                  <InputField label="Start Date" value={edu.startDate} onChange={(v: string) => updateArrayItem('education', edu.id, 'startDate', v)} />
                  <InputField label="End Date" value={edu.endDate} onChange={(v: string) => updateArrayItem('education', edu.id, 'endDate', v)} />
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem('education')}
              className="w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center gap-2 font-medium text-sm hover:bg-slate-800/50"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
        )}

         {/* Skills */}
         <SectionHeader title="Skills" id="skills" icon={Wrench} activeSection={activeSection} setActiveSection={setActiveSection} />
        {activeSection === 'skills' && (
          <div className="p-6 bg-slate-800/20 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 gap-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex gap-2 items-center group">
                  <div className="flex-1">
                     <input
                        placeholder="Skill name"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-blue-500 outline-none"
                        value={skill.name}
                        onChange={(e) => updateArrayItem('skills', skill.id, 'name', e.target.value)}
                    />
                  </div>
                  <select
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-blue-500 outline-none"
                    value={skill.level}
                    onChange={(e) => updateArrayItem('skills', skill.id, 'level', e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    onClick={() => removeItem('skills', skill.id)}
                    className="text-slate-600 hover:text-red-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
             <button
              onClick={() => addItem('skills')}
              className="mt-4 w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center gap-2 font-medium text-sm hover:bg-slate-800/50"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>
        )}

        {/* Projects */}
        <SectionHeader title="Projects" id="projects" icon={FolderKanban} activeSection={activeSection} setActiveSection={setActiveSection} />
        {activeSection === 'projects' && (
          <div className="p-6 space-y-6 animate-in slide-in-from-top-2 duration-200 bg-slate-800/20">
             {data.projects.map((proj) => (
                <div key={proj.id} className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 relative group hover:border-slate-600 transition-colors">
                     <button
                        onClick={() => removeItem('projects', proj.id)}
                        className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <InputField label="Project Name" value={proj.name} onChange={(v: string) => updateArrayItem('projects', proj.id, 'name', v)} />
                        <InputField label="Link (optional)" value={proj.link} onChange={(v: string) => updateArrayItem('projects', proj.id, 'link', v)} />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1 group-focus-within:text-blue-400 transition-colors">Description</label>
                         <textarea
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-slate-600"
                            rows={3}
                            value={proj.description}
                            onChange={(e) => updateArrayItem('projects', proj.id, 'description', e.target.value)}
                        />
                    </div>
                </div>
             ))}
              <button
              onClick={() => addItem('projects')}
              className="mt-4 w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center gap-2 font-medium text-sm hover:bg-slate-800/50"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        )}

      </div>
    </div>
  );
};