import  { FC } from "react";
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
import { IncomingBookSchema, bookValidation } from "../../validations/bookValidation";

interface InputProps {
  item: any; // Type as per your configuration
  form: UseFormReturn<z.infer<typeof bookValidation>>;
  bookData?: IncomingBookSchema;
}

const DashboardTextField: FC<InputProps> = ({ item, form }) => {
  return (
    <FormField
      key={item.name}
      control={form.control}
      name={item.name as keyof z.infer<typeof bookValidation>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{item.label}</FormLabel>
          <FormControl>
          <Input
            {...field}
            maxLength={item.maxLength}
            placeholder={item.placeholder}
            value={typeof field.value === 'string' ? field.value : ''}
            />
          </FormControl>
          {item.helpText && <FormDescription>{item.helpText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardTextField;
