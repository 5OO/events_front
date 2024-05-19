import axios from 'axios';

const baseURL = 'http://localhost:8080/api'; // Adjust the base URL as needed

const handleError = (error) => {
  if (error.response && error.response.data) {
    if (error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    if (typeof error.response.data === 'object') {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error(error.response.data);
  } else {
    throw new Error('An unexpected error occurred');
  }
};

export const fetchFutureEvents = async () => {
  try {
    const response = await axios.get(`${baseURL}/events/future`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${baseURL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchPastEvents = async () => {
  try {
    const response = await axios.get(`${baseURL}/events/past`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${baseURL}/events`, eventData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getEventWithAggregatedParticipants = async (eventId) => {
  try {
    const response = await axios.get(`${baseURL}/events/${eventId}/aggregated-participants`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getIndividualByIdAndEventId = async (participantId, eventId) => {
  try {
    const response = await axios.get(`${baseURL}/individuals/${participantId}/event/${eventId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCompanyByIdAndEventId = async (participantId, eventId) => {
  try {
    const response = await axios.get(`${baseURL}/companies/${participantId}/event/${eventId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createIndividual = async (individualData) => {
  try {
    const response = await axios.post(`${baseURL}/individuals`, individualData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateIndividual = async (participantId, individual) => {
  try {
    const response = await axios.put(`${baseURL}/individuals/${participantId}`, individual);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteIndividual = async (participantId) => {
  try {
    const response = await axios.delete(`${baseURL}/individuals/${participantId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${baseURL}/companies`, companyData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateCompany = async (participantId, company) => {
  try {
    const response = await axios.put(`${baseURL}/companies/${participantId}`, company);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCompany = async (participantId) => {
  try {
    const response = await axios.delete(`${baseURL}/companies/${participantId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getPaymentMethods = async () => {
  try {
    const response = await axios.get(`${baseURL}/config/payment-methods`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};