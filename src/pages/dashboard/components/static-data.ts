import { IconType } from "react-icons/lib";
import {  FaEnvelope, FaCog, FaBook, FaPersonBooth, FaChartLine, FaHome, } from "react-icons/fa";



interface IDashboardSidebar {
  name: string;
  icon: IconType;
  path: string;
}

const dashboardSidebar: IDashboardSidebar[] = [
  {
    name: "Home",
    icon: FaHome,
    path: "/",
  },
  {
    name: "Overview",
    icon: FaChartLine,
    path: "/dashboard",
  },
  {
    name: "Mails",
    icon: FaEnvelope,
    path: "/dashboard/mails",
  },
  {
    name: "Books",
    icon: FaBook,
    path: "/dashboard/books",
  },
  {
    name: "Users",
    icon: FaPersonBooth,
    path: "/dashboard/users",
  },
  {
    name: "Settings",
    icon: FaCog,
    path: "/dashboard/settings",
  },
];

interface IBooks {
  name: string;
  placeholder: string;
  accept: string;
  multiple?: boolean;
  label?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  helpText?: string;
}

export const dashboardBooks:IBooks[] = [
  {
    name: "coverImage",
    placeholder: "Select the cover image",
    accept: "image/*",
    label: "Cover Image",
    required: false,
    helpText: "Upload the cover image of the book."
  },
  {
    name: "title",
    placeholder: "Enter the title",
    accept: ".text",
    label: "Title",
    required: true,
    maxLength: 100,
    helpText: "The title of the book, up to 100 characters."
  },
  {
    name: "genre",
    placeholder: "Enter the genre",
    accept: ".text",
    label: "Genre",
    required: true,
    maxLength: 50,
    helpText: "The genre of the book, up to 50 characters."
  },
  {
    name: "descriptions",
    placeholder: "Enter the descriptions",
    accept: ".text",
    label: "Descriptions",
    required: true,
    maxLength: 500,
    helpText: "A brief description of the book, up to 500 characters."
  },
  {
    name: "pdf_file",
    placeholder: "Select the one pdf",
    accept: ".pdf",
    label: "PDF File",
    required: false,
    helpText: "Upload the PDF file of the book."
  },
  {
    name: "imageFiles",
    placeholder: "Select the Images",
    accept: "image/*",
    label: "Image Files",
    multiple: true,
    helpText: "Upload images related to the book. You can select multiple files."
  },

];



export default dashboardSidebar;
