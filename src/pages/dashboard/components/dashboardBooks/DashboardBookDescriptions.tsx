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
import { bookValidation } from "../../validations/bookValidation";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";

interface DiscriptionsProps {
  item: any; // Type as per your configuration
  form: UseFormReturn<z.infer<typeof bookValidation>>;
}

const DashboardBookDescriptions:FC<DiscriptionsProps> = ({ item, form }) => {
 
  return (
    <div>
      <FormField
        key={item.name}
        control={form.control}
        name={item.name as keyof z.infer<typeof bookValidation>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{item.label}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                maxLength={item.maxLength}
                placeholder={item.placeholder}
             
              />
            </FormControl>
            {item.helpText && (
              <FormDescription>{item.helpText}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DashboardBookDescriptions;
