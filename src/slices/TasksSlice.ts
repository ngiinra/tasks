"use client";
import { TaskType } from "@/types/TaskType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TaskType[] = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload);
    },

    updateTask: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<TaskType> }>
    ) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.updates,
        };
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state = state.filter((task) => task.id !== action.payload);
    },

    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
