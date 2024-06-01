import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookInterface {
  title: string;
  genre: string;
  descriptions: string;
  coverImage: string; // Change type to string
  imageFiles: string[]; // Change type to File[]
  pdf_file: string; // Change type to string
  isUpdatingBook: boolean;
}

const initialState: BookInterface = {
  title: "",
  genre: "",
  descriptions: "",
  coverImage: "",
  imageFiles: [],
  pdf_file: "",
  isUpdatingBook: false,
};

const bookSlice = createSlice({
  name: "dashboard/books",
  initialState,
  reducers: {
    setBookData: (state, action: PayloadAction<Partial<BookInterface>>) => {
      return { ...state, ...action.payload };
    },
    addImageFiles: (state, action: PayloadAction<string[]>) => {
      state.imageFiles = [...state.imageFiles, ...action.payload];
    },
    setCoverImage: (state, action: PayloadAction<string>) => { // Change payload type to string
      state.coverImage = action.payload;
    },
    setPdfFile: (state, action: PayloadAction<string>) => { // Change payload type to string
      state.pdf_file = action.payload;
    },
    setUpdatingBook: (state, action: PayloadAction<boolean>) => {
      state.isUpdatingBook = action.payload;
    },
  },
});

export const {
  setBookData,
  addImageFiles,
  setCoverImage,
  setPdfFile,
  setUpdatingBook,
} = bookSlice.actions;
export default bookSlice.reducer;
