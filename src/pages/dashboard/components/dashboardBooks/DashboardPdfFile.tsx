// PdfFile.tsx

import React from "react";
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
import {
  IncomingBookSchema,
  bookValidation,
} from "../../validations/bookValidation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setPdfFile } from "@/features/dashboard/booksReducer";

interface PdfFileProps {
  item: any; // Type as per your configuration
  form: UseFormReturn<z.infer<typeof bookValidation>>;
  bookData?: IncomingBookSchema;
}

const DashboardPdfFile: React.FC<PdfFileProps> = ({ item, form }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleSingleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        const imageUrl = URL.createObjectURL(file);

        dispatch(setPdfFile(imageUrl));
      } else {
        alert("Image or file size should be less than 10 MB");
      }
    } else {
      alert("No file chosen");
    }
  };
console.log(item.accept)
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
              type="file"
value={""}
              accept={item.accept}
              onBlur={field.onBlur}
              onChange={handleSingleFile}
            />
          </FormControl>
          {item.helpText && <FormDescription>{item.helpText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardPdfFile;
