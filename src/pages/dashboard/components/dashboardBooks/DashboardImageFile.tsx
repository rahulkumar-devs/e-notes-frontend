import { ChangeEvent, FC, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { bookFormSchema } from "../../validations/bookValidation";

interface IImageFiles {
  form: UseFormReturn<z.infer<typeof bookFormSchema>>;
  placeholder?: string;
  fileAccept?: string;
  label?: string;
  name: string;
  showImageFiles?: { public_id: string; url: string }[];
}

const DashboardImageFile: FC<IImageFiles> = ({
  form,
  name,
  placeholder = "Choose a cover image...",
  fileAccept = "image/*",
  label = "Cover Image",
  showImageFiles,
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: FieldValues
  ) => {
    const files = event.target.files;

    if (files) {
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit
      const selectedFiles: File[] = Array.from(files); // Convert FileList to Array

      const isValid = selectedFiles.every((file) => {
        if (file.size > fileSizeLimit) {
          setError("File size should be less than 5MB");
          return false;
        }
        if (!file.type.startsWith("image/")) {
          setError("Only image files are allowed");
          return false;
        }
        return true;
      });

      if (!isValid) {
        setImageUrls([]);
        return;
      }

      setError(null);

      const readerPromises = selectedFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

      Promise.all(readerPromises)
        .then((urls) => {
          setImageUrls(urls);
          form.setValue(field.name, selectedFiles); // Set value as an array of files
          form.trigger(field.name);
        })
        .catch((error: any) => {
          setError(`Error reading image file ${error}`);
          setImageUrls([]);
        });
    }
  };

  return (
    <FormField
      control={form.control}
      name={name as keyof z.infer<typeof bookFormSchema>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              placeholder={placeholder}
              accept={fileAccept}
              multiple
              onChange={(event) => {
                handleImageChange(event, field);
                field.onChange(event);
              }}
              onBlur={field.onBlur}
            />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className=" flex flex-wrap gap-1 justify-center">
            {imageUrls && imageUrls.length > 0
              ? imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    className=" max-w-[200px]"
                  />
                ))
              : showImageFiles &&
                showImageFiles.map((img) => (
                  <img
                    key={img.public_id}
                    src={img.url}
                    alt={`Image ${img.public_id + 1}`}
                    className=" max-w-[200px]"
                  />
                ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardImageFile;
