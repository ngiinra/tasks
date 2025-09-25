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
    setTags: (state, action: PayloadAction<DefinitionType[]>) => {
      state = action.payload;
    },
  },
});

export default TagsSlice.reducer;
export const { addTag, setTags } = TagsSlice.actions;
