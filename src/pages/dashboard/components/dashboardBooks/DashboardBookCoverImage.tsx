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
import { useDispatch } from "react-redux";
import { setCoverImage } from "@/features/dashboard/booksReducer";
import { AppDispatch } from "@/store/store";
import { cn } from "@/lib/utils";

interface CoverImageProps {
  item: any; // Type as per your configuration
  form: UseFormReturn<z.infer<typeof bookValidation>>;
  className?: string;
}

const DashboardBookCoverImage: FC<CoverImageProps> = ({
  item,
  form,
  className,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleSingleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        // Create object URL for the selected file
        const imageUrl = URL.createObjectURL(file);
        // Dispatch action with the URL of the selected cover image
        dispatch(setCoverImage(imageUrl));
      } else {
        alert("Image or file size should be less than 10 MB");
      }
    } else {
      alert("No file chosen");
    }
  };

  return (
    <div className={cn(" dark:bg-gray-900 dark:text-white", className)}>
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
                accept={item.accept}
                {...field}
                value={""}
                onChange={handleSingleFile}
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

export default DashboardBookCoverImage;
