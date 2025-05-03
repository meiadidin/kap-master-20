
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}

const FormField = ({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  required = false, 
  error 
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "border-red-500" : ""}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;
