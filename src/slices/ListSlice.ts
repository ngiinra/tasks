import { DefinitionType, ListType } from "@/types/definitionsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DefinitionType[] = [];
const ListsSlice = createSlice({
  initialState,
  name: "Lists",
  reducers: {
    addList: (state, action: PayloadAction<DefinitionType>) => {
      state.push(action.payload);
    },
    setLists: (state, action: PayloadAction<DefinitionType[]>) => {
      state = action.payload;
    },
  },
});

export default ListsSlice.reducer;
export const { addList, setLists } = ListsSlice.actions;
