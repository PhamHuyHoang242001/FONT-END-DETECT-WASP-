import axios from "axios";

// GET request
const getData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// POST request
const createData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

// PUT request
const updateData = async (url, updatedData) => {
  try {
    const response = await axios.put(url, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// DELETE request
const deleteData = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export { getData, createData, updateData, deleteData };
