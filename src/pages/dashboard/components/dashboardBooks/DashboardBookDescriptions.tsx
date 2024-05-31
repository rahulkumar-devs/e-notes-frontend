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
import { IncomingBookSchema, bookValidation } from "../../validations/bookValidation";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";

interface DescriptionsProps {
  item: any;
  form: UseFormReturn<z.infer<typeof bookValidation>>;
  bookData?: IncomingBookSchema; 
}

const DashboardBookDescriptions: FC<DescriptionsProps> = ({
  item,
  form,
  bookData,
}) => {
  return (
    <FormField
      key={item.name}
      control={form.control}
      name={item.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{item.label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              maxLength={item.maxLength}
              placeholder={item.placeholder}
              defaultValue={bookData?.descriptions || ""}
            />
          </FormControl>
          {item.helpText && <FormDescription>{item.helpText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardBookDescriptions;
