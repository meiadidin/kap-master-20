
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormValues, competencies } from "../schema/teamMemberSchema";

interface CompetenciesFieldProps {
  form: UseFormReturn<FormValues>;
  disabled: boolean;
}

const CompetenciesField: React.FC<CompetenciesFieldProps> = ({ form, disabled }) => {
  return (
    <FormField
      control={form.control}
      name="competencies"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Kompetensi</FormLabel>
            <FormDescription>
              Pilih kompetensi yang dikuasai
            </FormDescription>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {competencies.map((competency) => (
              <FormField
                key={competency.id}
                control={form.control}
                name="competencies"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={competency.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          disabled={disabled}
                          checked={field.value?.includes(competency.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, competency.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== competency.id
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {competency.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompetenciesField;
