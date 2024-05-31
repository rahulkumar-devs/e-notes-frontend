import { useState } from "react";
import DashboardBookForm from "../components/dashboardBooks/DashboardBookForm";
import BookStates from "../components/dashboardBooks/bookStates/BookStates";
import ViewUploadBooks from "../components/dashboardBooks/viewUploadBooks/ViewUploadBooks";
import { Button } from "@/components/ui/button";

const DashboardBooks = () => {
  const [activeComponent, setActiveComponent] = useState("DashboardBookForm");

  const renderComponent = () => {
    switch (activeComponent) {
      case "DashboardBookForm":
        return <DashboardBookForm />;
      case "BookStates":
        return <BookStates />;
      case "ViewUploadBooks":
        return <ViewUploadBooks />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-evenly py-3 border-b">
        <Button
          onClick={() => setActiveComponent("DashboardBookForm")}
          className="mb-2 sm:mb-0"
        >
          Upload book pdf
        </Button>
        <Button
          onClick={() => setActiveComponent("BookStates")}
          className="mb-2 sm:mb-0"
        >
          Book States
        </Button>
        <Button
          onClick={() => setActiveComponent("ViewUploadBooks")}
          className="mb-2 sm:mb-0"
        >
          View Upload Books
        </Button>
      </div>
      <div className="mt-4">{renderComponent()}</div>
    </div>
  );
};

export default DashboardBooks;
