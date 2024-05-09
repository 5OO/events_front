import axios from 'axios';

const baseURL = 'http://localhost:8080/api'; // Adjust the base URL as needed

export const fetchFutureEvents = async () => {
  try {
    const response = await axios.get(`${baseURL}/events/future`);
    return response.data;
  } catch (error) {
    console.error('Error fetching future events:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${baseURL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const fetchPastEvents = async () => {
  try {
    const response = await axios.get(`${baseURL}/events/past`);
    return response.data;
  } catch (error) {
    console.error('Error fetching future events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${baseURL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const getEventWithAggregatedParticipants = async (eventId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/events/${eventId}/aggregated-participants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching aggregated participants:', error);
    throw error;
  }
};

export const getIndividualByIdAndEventId = async (participantId, eventId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/individuals/${participantId}/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching individual:', error);
    throw error;
  }
};

export const getCompanyByIdAndEventId = async (participantId, eventId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/companies/${participantId}/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company:', error);
    throw error;
  }
};

export const createIndividual = async (individualData) => {
  try {
    const response = await axios.post(`${baseURL}/individuals`, individualData);
    return response.data;
  } catch (error) {
    console.error('Error creating individual:', error);
    throw error;
  }
};

export const updateIndividual = async (participantId, individual) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/individuals/${participantId}`, individual);
    return response.data;
  } catch (error) {
    console.error('Error updating individual:', error);
    throw error;
  }
};

export const deleteIndividual = async (participantId) => {
  try {
    const response = await axios.delete(`${baseURL}/individuals/${participantId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting individual:', error);
    throw error;
  }
};

export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${baseURL}/companies`, companyData);
    return response.data;
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};

export const updateCompany = async (participantId, company) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/companies/${participantId}`, company);
    return response.data;
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
};

export const deleteCompany = async (participantId) => {
  try {
    const response = await axios.delete(`${baseURL}/companies/${participantId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting company:', error);
    throw error;
  }
};


export const getPaymentMethods = async () => {
  try {
    const response = await axios.get(`${baseURL}/config/payment-methods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};