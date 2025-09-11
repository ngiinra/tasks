"use client";
import { TaskType } from "@/types/TaskType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const TaskSlice = createSlice({
  name: "Task",
  initialState: {
    id: "",
    title: "",
    description: "",
    tags: "",
    list: "",
    userId: "",
    state: "",
    todoDate: "",
    doneDate: "",
    deleted: false,
  } as TaskType,
  reducers: {
    changeTask: (state, action: PayloadAction<Partial<TaskType>>) => {
      if (action.payload.title) state.title = action.payload.title;
      if (action.payload.description)
        state.description = action.payload.description;
      if (action.payload.tags) state.tags = action.payload.tags;
      if (action.payload.list) state.list = action.payload.list;
      if (action.payload.state) state.state = action.payload.state;
      if (action.payload.todoDate) state.todoDate = action.payload.todoDate;
      if (action.payload.doneDate) state.doneDate = action.payload.doneDate;
      if (action.payload.deleted) state.deleted = action.payload.deleted;
    },
  },
});

export const { changeTask } = UserSlice.actions;
export default TaskSlice.reducer;
