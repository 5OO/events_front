<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createEvent } from '@/services/api';

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
    const response = await createEvent(event.value); // Use the imported function
    console.log('Event Created:', response);
    router.push('/'); // Redirect to home after submit
  } catch (error) {
    console.error('Failed to create event:', error.message);
    alert('Error: ' + error.message);
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
  align-items: center; /* Aligns the text and image vertically */
  background-color: #005aa1;
  color: white;
  padding: 10px;
}

h1 {
  margin: 0;
  flex-grow: 1; /* Allows the text to take up the remaining space */
  opacity: 0.8;
}

img {
  height: 100%; /* Sets the image height to match the h1 element */
  width: auto; /* Maintains aspect ratio */
}


.form-group {
  display: flex;
  align-items: center; /* This will vertically align the label and input */
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 400px;
}

label {
  flex: 1; /* Allocates 1 portion of the available space to the label */
  margin-right: 10px; /* Adds some space between the label and the input */
}

input[type="text"],
input[type="datetime-local"],
textarea {
  flex: 3; /* Allocates 3 portions of the available space to the input, making it larger than the label */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Ensures the input expands to fill the flex item */
}

.form-actions {
  display: flex;
  justify-content: flex-start; /* Aligns buttons to the left */
  gap: 10px; /* Provides spacing between the buttons */
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