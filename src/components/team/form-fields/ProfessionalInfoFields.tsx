
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues, positions } from "../schema/teamMemberSchema";

interface ProfessionalInfoFieldsProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const ProfessionalInfoFields: React.FC<ProfessionalInfoFieldsProps> = ({ form, disabled }) => {
  return (
    <>
      {/* Posisi/Role */}
      <FormField
        control={form.control}
        name="position"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Posisi/Role</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih posisi" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Pengalaman */}
      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pengalaman (tahun)</FormLabel>
            <FormControl>
              <Input 
                placeholder="Contoh: 5" 
                {...field} 
                disabled={disabled}
                onChange={(e) => {
                  // Only allow numbers
                  const value = e.target.value.replace(/\D/g, '');
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProfessionalInfoFields;
