
import ViewUploadBookCard from "./viewUploadBookCard";
import dummyBooks from "./dummyBook";



const ViewUploadBooks = () => {
  return (
    <div className="md:p-4 grid grid-cols-1 md:grid-cols-2 ">
      {dummyBooks.map((book) => (
        <ViewUploadBookCard key={book.pdf_file.public_id} book={book} />
        // <BookStates key={book.pdf_file.public_id} book={book}/>
      ))}
    </div>
  );
};

export default ViewUploadBooks;
