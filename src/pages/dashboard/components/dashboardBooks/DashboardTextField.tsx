import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { bookFormSchema } from "../../validations/bookValidation";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface ICoverImage {
  form:  UseFormReturn<z.infer<typeof bookFormSchema>>;
  name:string;
  placeholder:string;
  fileAccept?:string;
  label:string;
}

const DashboardTextField: FC<ICoverImage> = ({ form,name,label,placeholder }) => {
  return (
    <FormField
      control={form.control}
      name={name as keyof z.infer<typeof bookFormSchema>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
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

export default DashboardTextField;
