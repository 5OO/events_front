<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchFutureEvents, deleteEvent } from '../services/api.js';

const events = ref([]);
const router = useRouter();
console.log(router);

const getEvents = async () => {
  try {
    events.value = await fetchFutureEvents();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    alert('Failed to fetch events');
  }
};

const removeEvent = async (eventId) => {
  try {
    await deleteEvent(eventId);
    await getEvents(); // Refresh the list after deletion
  } catch (error) {
    console.error('Failed to delete event:', error);
    alert('Failed to delete event');
  }
};

const addParticipants = (eventId) => {
  router.push(`/events/${eventId}/participants`);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  });
};

const goToAddEvent = () => {
  router.push('/add-event');
};

onMounted(getEvents);
</script>

<template>
  <div>
    <div class="events-header">Future Events</div>
    <ol class="events-container">
      <li v-for="(event, index) in events" :key="event.eventId" class="event-item">
        <span class="event-name">{{ index + 1 }}. {{ event.eventName }}</span>
        <span class="event-date">{{ formatDate(event.eventDateTime) }}</span>
        <span class="event-actions-add">
          <button @click="addParticipants(event.eventId)">Participants</button>
        </span>
        <span class="event-actions">
          <button @click="removeEvent(event.eventId)">X</button>
        </span>
      </li>
    </ol>
    <button @click="goToAddEvent" class="add-event-button">Add Event</button>
  </div>
</template>

<style scoped>
.events-header {
  width: 580px;
  height: 68px;
  background-color: #005aa1;
  color: #ffffff;
  font-size: 21px;
  line-height: 45px;
  font-weight: 400;
  font-family: "Open Sans", sans-serif;
  text-align: center; /* Centers the text if needed */
  display: flex;
  align-items: center; /* Vertically centers the text */
  justify-content: center; /* Horizontally centers the text */
}
.events-container {
  width: 580px;
  height: 335px;
  background-color: #ffffff;
  filter: drop-shadow(0px 1px 0px rgba(0,0,0,0.09));
  overflow-y: auto; /* Allows scrolling if content exceeds 335px height */
}
.event-item {
  display: grid;
  grid-template-columns:  3fr 2fr 1fr 1fr;
  gap: 8px;
  align-items: center;
  padding: 8px 0;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  line-height: 30px;
  color: #2f2f2f;
  font-weight: 400;
}

.event-name, .event-date, .event-actions-add, .event-actions {
  padding: 0 10px; /* Adds padding to each grid item */
}

.add-event-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #005aa1;
  border: none;
  cursor: pointer;
}
.add-event-button:hover {
  background-color: #003870;
}

</style>