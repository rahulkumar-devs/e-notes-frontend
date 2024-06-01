import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import ShowMore from "./ShowMore";
import UpdateBook from "./UpdateBook";
import { IncomingBookSchema } from "@/pages/dashboard/validations/bookValidation";

interface ViewUploadBookCardProps {
  book: IncomingBookSchema;
}

const ViewUploadBookCard: FC<ViewUploadBookCardProps> = ({ book }) => {
  const [isSelected, setSelected] = useState(false);
  return (
    <div className="w-full">
      <Card className="shadow-lg  relative w-full p-0 md:p-4">
        <div className="absolute top-2 right-2">
          <ShowMore setSelected={setSelected} />
        </div>

        {isSelected ? (
          <UpdateBook book={book}  goBack ={setSelected} />
        ) : (
          <div>
            <CardHeader className="flex items-center justify-between">
              <div className="relative h-16 w-16">
                <img
                  src={book.coverImage.url}
                  alt="Book Cover"
                  className="rounded-lg h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <Button className="ml-4">
                <Link
                  to={book.pdf_file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View PDF
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <CardTitle>{book.title}</CardTitle>
              <CardTitle>{book.genre}</CardTitle>
              <CardDescription>{book.descriptions}</CardDescription>
            </CardContent>
            <CardContent>
              {book.imageFiles.map((item) => (
                <img
                  key={item.public_id}
                  src={item.url}
                  alt="Book Image"
                  className="my-2 rounded"
                  loading="lazy"
                />
              ))}
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ViewUploadBookCard;
