import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import notaServicio from "./notaServicio";

const initialState = {
  notes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get user's notes
export const getTarea = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await notaServicio.getTarea(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create a note
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await notaServicio.createNote(token, noteData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a note
export const deleteTarea = createAsyncThunk(
  "notes/delete",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await notaServicio.deleteTarea(token, noteId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update a note
export const updateTarea = createAsyncThunk(
  "notes/update",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await notaServicio.updateTarea(token, noteData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const notaSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Notes
      .addCase(getTarea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTarea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getTarea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //-------------------------------------------------
      // Create a note
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //-------------------------------------------------
      // Delete a note
      .addCase(deleteTarea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTarea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = state.notes.filter((note) => {
          return note._id !== action.payload.id;
        });
      })
      .addCase(deleteTarea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //-------------------------------------------------
      // Update a note
      .addCase(updateTarea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTarea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = state.notes.map((note) => {
          return note._id === action.payload.id ? action.payload : note;
        });
      })
      .addCase(updateTarea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = notaSlice.actions;
export default notaSlice.reducer;
