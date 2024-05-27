import { useBookApiQuery } from '@/features/api/authApi';  // Ensure the path is correct

const Books = () => {
  // Directly use the hook provided by RTK Query
  const { data, error, isLoading } = useBookApiQuery();

  

  // Handle different states (loading, error, success)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as any).message}</div>;  // Adjust error handling as needed
  }

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {data?.books?.map((book: any) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
