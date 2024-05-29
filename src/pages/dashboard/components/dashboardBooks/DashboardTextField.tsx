import React, { FC } from "react";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { bookValidation } from "../../validations/bookValidation";

interface InputeProps {
  item: any; // Type as per your configuration
  form: UseFormReturn<z.infer<typeof bookValidation>>;
}

const DashboardTextField: FC<InputeProps> = ({ item, form }) => {
  
  return (
    <FormField
      key={item.name}
      control={form.control}
      name={item.name as keyof z.infer<typeof bookValidation>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{item.label}</FormLabel>
          <FormControl>
            <Input placeholder={item.placeholder} {...field} />
          </FormControl>
          {item.helpText && <FormDescription>{item.helpText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardTextField;
