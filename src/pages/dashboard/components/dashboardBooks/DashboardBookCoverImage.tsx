import  { ChangeEvent, FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
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

interface ICoverImage {
  form: UseFormReturn<z.infer<typeof bookFormSchema>>;
  placeholder?: string;
  fileAccept?: string;
  label?: string;
  name:string;
  showCoverImages?:{
    public_id:string;
    url:string;
  };
}

const DashboardBookCoverImage: FC<ICoverImage> = ({
  form,
  placeholder = "Choose a cover image...",
  fileAccept = "image/*",
  label = "Cover Image",
  name,
  showCoverImages
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size should be less than 5MB");
        setImageUrl(null);
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        setImageUrl(null);
        return;
      }

      setError(null);
      form.setValue("coverImage", file);
      form.trigger("coverImage");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name as keyof z.infer<typeof bookFormSchema> }
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              placeholder={placeholder}
              accept={fileAccept}
              onChange={(event) => {
                handleChanges(event);
                field.onChange(event);
                const file = event.target.files?.[0];
                form.setValue(field.name, file); 
                form.trigger(field.name); 
                
              }}
              onBlur={field.onBlur}
            />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {imageUrl ? <img src={imageUrl} alt="Cover Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />:
          <img src={showCoverImages?.url} alt={showCoverImages?.public_id} />
          }
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardBookCoverImage;
