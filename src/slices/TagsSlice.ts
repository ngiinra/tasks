import { DefinitionType } from "@/types/definitionsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DefinitionType[] = [];
const TagsSlice = createSlice({
  initialState,
  name: "Tags",
  reducers: {
    addTag: (state, action: PayloadAction<DefinitionType>) => {
      state.push(action.payload);
    },
    updateTag: (state, action: PayloadAction<DefinitionType>) => {
      const index = state.findIndex((tag) => tag.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    setTags: (state, action: PayloadAction<DefinitionType[]>) => {
      state = action.payload;
    },
    deleteTag: (state, action: PayloadAction<string | number>) => {
      state = state.filter((tag) => tag.id !== action.payload);
    },
  },
});

export default TagsSlice.reducer;
export const { addTag, setTags, updateTag, deleteTag } = TagsSlice.actions;
