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
    updateList: (state, action: PayloadAction<DefinitionType>) => {
      const index = state.findIndex((list) => list.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    setLists: (state, action: PayloadAction<DefinitionType[]>) => {
      state = action.payload;
    },
    deleteList: (state, action: PayloadAction<string | number>) => {
      state = state.filter((list) => list.id !== action.payload);
    },
  },
});

export default ListsSlice.reducer;
export const { addList, setLists, updateList, deleteList } = ListsSlice.actions;
