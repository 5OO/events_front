import axios from 'axios';

const baseURL = 'http://localhost:8080/api/events'; // Adjust the base URL as needed

export const fetchFutureEvents = async () => {
  try {
    const response = await axios.get(`${baseURL}/future`);
    return response.data;
  } catch (error) {
    console.error('Error fetching future events:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${baseURL}/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const fetchPastEvents = async () => {
  try {
    const response = await axios.get(`${baseURL}/past`);
    return response.data;
  } catch (error) {
    console.error('Error fetching future events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${baseURL}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
