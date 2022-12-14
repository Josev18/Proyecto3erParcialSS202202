import axios from "axios";

const API_URL = "/api/notes/";

// Get user's notes
const getTarea = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Create a note
const createNote = async (token, noteData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);

  return response.data;
};

// Delete a note
const deleteTarea = async (token, noteId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + noteId, config);

  return response.data;
};

// Update a note
const updateTarea = async (token, noteData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + noteData._id, noteData, config);
  return response.data;
};

const notaServicio = {
  getTarea,
  createNote,
  deleteTarea,
  updateTarea,
};

export default notaServicio;
