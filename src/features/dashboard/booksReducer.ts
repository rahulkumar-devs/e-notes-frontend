import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookInterface {
  title: string;
  genre: string;
  descriptions: string;
  coverImage: string;
  imageFiles: string[];
  pdf_file: string;
}

const initialState: BookInterface = {
  title: "",
  genre: "",
  descriptions: "",
  coverImage: "",
  imageFiles: [],
  pdf_file: "",
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
    setCoverImage: (state, action: PayloadAction<string>) => {
      state.coverImage = action.payload;
    },
    setPdfFile: (state, action: PayloadAction<string>) => {
      state.pdf_file = action.payload;
    },
  },
});

export const { setBookData, addImageFiles, setCoverImage, setPdfFile } =
  bookSlice.actions;
export default bookSlice.reducer;