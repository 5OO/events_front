<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const event = ref({
  eventName: '',
  eventDateTime: '',
  location: '',
  additionalInfo: ''
});

const goBack = () => {
  router.push('/');
};

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/events', event.value);
    console.log('Event Created:', response.data);
    router.push('/'); // Redirect to home after submit
  } catch (error) {
    console.error('Failed to create event:', error.response.data);
    alert('Error: ' + error.response.data.message);
  }
};
</script>

<template>
  <div class="add-event-container">
    <h1>Add New Event</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" v-model="event.eventName" required>
      </div>
      <div class="form-group">
        <label for="eventDateTime">Event Date and Time:</label>
        <input type="datetime-local" id="eventDateTime" v-model="event.eventDateTime" required>
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="event.location" required>
      </div>
      <div class="form-group">
        <label for="additionalInfo">Additional Info:</label>
        <textarea id="additionalInfo" v-model="event.additionalInfo"></textarea>
      </div>
      <div class="form-actions">
        <button type="button" @click="goBack">Back</button>
        <button type="submit" class="submit-btn">Add</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

.add-event-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="datetime-local"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button.submit-btn {
  background-color: #005aa1;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>