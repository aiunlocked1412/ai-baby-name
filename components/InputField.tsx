import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
  options?: string[];
  icon?: React.ReactNode;
  id: string;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  options,
  icon,
  id
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1 pl-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        {type === 'select' ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none appearance-none`}
          >
            {options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none shadow-sm`}
          />
        )}
      </div>
    </div>
  );
};