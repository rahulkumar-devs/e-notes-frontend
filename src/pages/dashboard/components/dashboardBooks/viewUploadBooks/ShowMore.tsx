import { FC, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";


interface IShowmore {
  setSelected:(isUpateBook:boolean)=> void;
  isSelected?:boolean
}

const ShowMore:FC<IShowmore> = ({setSelected}) => {
  const [isUpateBook, setUpdateBook] = useState(false);
  const handleEdit = () => {
    setUpdateBook(!isUpateBook);
    setSelected(!isUpateBook)
  };

  const handleDelete = () => {};

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <IoMdMore />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[150px] bg-white shadow-md rounded-md p-2 right-0">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
          <Button
            onClick={handleEdit}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          >
            <FaRegEdit className="h-4 w-4" />
            <span>Edit</span>
          </Button>

          

          <DropdownMenuItem
            onSelect={handleDelete}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          >
            <MdDelete className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ShowMore;
