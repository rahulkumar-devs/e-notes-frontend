import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";
import { bookFormSchema } from "../../validations/bookValidation";

interface DescriptionsProps {
  form: UseFormReturn<z.infer<typeof bookFormSchema>>;
  name: string;
  placeholder: string;
  label: string;
  maxLength?: number;
}

const DashboardBookDescriptions: FC<DescriptionsProps> = ({
  name,
  label,
  maxLength,
  placeholder,
  form,
}) => {
  return (
    <FormField
      key={name}
      control={form.control}
      name={name as keyof z.infer<typeof bookFormSchema>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              maxLength={maxLength}
              placeholder={placeholder}
              value={typeof field.value === "string" ? field.value : ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardBookDescriptions;
