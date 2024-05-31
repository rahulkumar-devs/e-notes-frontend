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
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addImageFiles } from "@/features/dashboard/booksReducer";

interface ImageFileProps {
  item: any; // Type as per your configuration
  form: UseFormReturn<z.infer<typeof bookValidation>>;
}

const DashboardImageFile: FC<ImageFileProps> = ({ item, form }) => {
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [showAllImages, setShowAllImages] = React.useState(false);

  const dispatch: AppDispatch = useDispatch();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const validFiles: File[] = Array.from(event.target.files).filter(
        (file) => file.size <= 10 * 1024 * 1024
      );
      setSelectedImages(validFiles);

      // Collect all image URLs
      const imageUrls: string[] = validFiles.map((file) =>
        URL.createObjectURL(file)
      );

      // Dispatch action with all image URLs
      dispatch(addImageFiles(imageUrls));
    }
  };

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
              <Input
                type="file"
                accept={item.accept}
                multiple={item.multiple}
                value={""}
                onChange={(e) => {
                  handleImageChange(e);
                  field.onChange(e);
                }}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            </FormControl>
            {item.helpText && (
              <FormDescription>{item.helpText}</FormDescription>
            )}
            <FormMessage />
            {selectedImages.length > 0 && (
              <div className="mt-4">
                <div className="grid grid-cols-5 gap-2">
                  {selectedImages
                    .slice(0, showAllImages ? undefined : 5)
                    .map((file, index) => (
                      <img
                        key={index} // Use a unique key for each image
                        src={URL.createObjectURL(file)}
                        alt={`selected-${index}`}
                        className="w-full h-auto"
                      />
                    ))}
                </div>
                {selectedImages.length > 5 && (
                  <Button
                    className="mt-2"
                    onClick={() => setShowAllImages(!showAllImages)}
                  >
                    {showAllImages ? "Show Less" : "See More"}
                  </Button>
                )}
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default DashboardImageFile;
