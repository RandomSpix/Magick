import React from 'react';
import { Check, X } from 'lucide-react';

interface Requirement {
  label: string;
  regex: RegExp;
}

const requirements: Requirement[] = [
  { label: 'At least 8 characters', regex: /.{8,}/ },
  { label: 'Contains uppercase letter', regex: /[A-Z]/ },
  { label: 'Contains lowercase letter', regex: /[a-z]/ },
  { label: 'Contains number', regex: /[0-9]/ },
  { label: 'Contains special character', regex: /[^A-Za-z0-9]/ },
];

interface Props {
  password: string;
}

export function PasswordStrengthMeter({ password }: Props) {
  return (
    <div className="mt-2 space-y-2">
      {requirements.map(({ label, regex }) => {
        const isValid = regex.test(password);
        return (
          <div 
            key={label} 
            className={`flex items-center text-sm ${
              isValid ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {isValid ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <X className="w-4 h-4 mr-2" />
            )}
            {label}
          </div>
        );
      })}
    </div>
  );
}