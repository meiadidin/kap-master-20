
import React from "react";
import { Label } from "@/components/ui/label";

interface SkillsSelectorProps {
  skills: string[];
  selectedSkills: string[];
  onToggleSkill: (skill: string) => void;
  label?: string;
}

const SkillsSelector = ({ 
  skills, 
  selectedSkills, 
  onToggleSkill,
  label = "Keahlian" 
}: SkillsSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`skill-${skill}`}
              checked={selectedSkills.includes(skill)}
              onChange={() => onToggleSkill(skill)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor={`skill-${skill}`} className="text-sm">
              {skill}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSelector;
