<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createEvent } from '@/services/api';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const toast = useToast();
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
    await createEvent(event.value);
    toast.success('New event created successfully', {
      position: 'top',
      duration: 5000
    });
    await router.push('/');
  } catch (error) {
    console.error('Failed to create event:', error.message);
    toast.error(error.message || 'Failed to create event ' + error.message, {
      position: 'top',
      duration: 5000
    });
  }
};
</script>

<template>
  <div class="add-event-container">


    <div class="d-flex align-items-stretch">
      <h1 class="flex-grow-1 mb-0">Add New Event</h1>
      <div class="image-container">
        <img src="@/assets/center-img-labeled.jpg" alt="Event">
      </div>
    </div>

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
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: white;
  border-radius: 1px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.image-container {
  width: auto;
  max-width: 100%;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.header {
  display: flex;
  align-items: center;
  background-color: #005aa1;
  color: white;
  padding: 10px;
}

h1 {
  margin: 0;
  flex-grow: 1;
  opacity: 0.8;
}

img {
  height: 100%;
  width: auto;
}


.form-group {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 400px;
}

label {
  flex: 1;
  margin-right: 10px;
}

input[type="text"],
input[type="datetime-local"],
textarea {
  flex: 3;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
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