
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  helpText?: string;
}

const ImageUpload = ({ 
  onChange, 
  label = "Foto Profil",
  helpText = "Format yang diterima: JPG atau PNG, ukuran maksimum 2MB"
}: ImageUploadProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="image">{label}</Label>
      <Input
        id="image"
        name="image"
        type="file"
        onChange={onChange}
        accept="image/jpeg, image/png"
      />
      <p className="text-xs text-gray-500 mt-1">{helpText}</p>
    </div>
  );
};

export default ImageUpload;
