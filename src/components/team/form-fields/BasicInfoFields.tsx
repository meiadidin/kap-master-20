
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../schema/teamMemberSchema";

interface BasicInfoFieldsProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form, disabled }) => {
  return (
    <>
      {/* Nama Lengkap */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Lengkap</FormLabel>
            <FormControl>
              <Input 
                placeholder="Masukkan nama lengkap" 
                {...field} 
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input 
                placeholder="contoh@email.com" 
                type="email" 
                {...field} 
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Nomor Telepon */}
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nomor Telepon</FormLabel>
            <FormControl>
              <Input 
                placeholder="08123456789" 
                {...field} 
                disabled={disabled}
                maxLength={15}
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

export default BasicInfoFields;
