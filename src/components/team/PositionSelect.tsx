
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PositionSelectProps {
  positions: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PositionSelect = ({ positions, value, onChange, error }: PositionSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="position">
        Posisi <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger id="position" className={`w-full ${error ? "border-red-500" : ""}`}>
          <SelectValue placeholder="Pilih posisi" />
        </SelectTrigger>
        <SelectContent>
          {positions.map((position) => (
            <SelectItem key={position} value={position}>
              {position}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default PositionSelect;
