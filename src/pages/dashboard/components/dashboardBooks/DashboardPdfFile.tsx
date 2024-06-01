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

interface IPdfFile {
  form: UseFormReturn<z.infer<typeof bookFormSchema>>;
  placeholder?: string;
  label?: string;
  name:string;
  fileAccept:string
  showPdfFile?:{
    public_id:string;
    url:string;
  }
}

const DashboardPdfFile: FC<IPdfFile> = ({
  name,
  fileAccept="application/pdf",
  form,
  placeholder = "Choose a PDF file...",
  label = "PDF File",
  showPdfFile
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setError("File size should be less than 10MB");
        setFileUrl(null);
        return;
      }

      if (!file.type.startsWith("application/pdf")) {
        setError("Only PDF files are allowed");
        setFileUrl(null);
        return;
      }

      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
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
              onChange={(event) => {
                handleFileChange(event); // Pass field object here
                field.onChange(event);
                const file = event.target.files?.[0];

                form.setValue(field.name, file);
                form.trigger(field.name);
              }}
              onBlur={field.onBlur}
            />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {fileUrl ?(
            <embed
              src={fileUrl}
              type="application/pdf"
              width="100%"
              height="250px"
            />
          ):
          <embed
          src={showPdfFile?.url}
          type="application/pdf"
          width="100%"
          height="250px"

        />
          
          }
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DashboardPdfFile;
