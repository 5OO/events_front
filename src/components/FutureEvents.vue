<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchFutureEvents, deleteEvent } from '../services/api.js';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const toast = useToast();
const events = ref([]);
const router = useRouter();

const getEvents = async () => {
  try {
    events.value = await fetchFutureEvents();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    toast.error('Failed to fetch future events', {
      position: 'top',
      duration: 5000
    });
  }
};

const removeEvent = async (eventId) => {
  try {
    await deleteEvent(eventId);
    await getEvents(); // Refresh the list after deletion
  } catch (error) {
    console.error('Failed to delete event:', error);
    toast.error('Failed to delete event', {
      position: 'top',
      duration: 5000
    });
  }
};

const viewParticipants = (eventId) => {
  router.push(`/events/${eventId}/participants`);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-DE', {
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
        <span class="event-date">{{ formatDate(event.eventDate) }}</span>
        <span class="event-participants">{{ event.totalParticipants }} </span>
        <span class="event-actions-add">
          <button @click="viewParticipants(event.eventId)">Participants</button>
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
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.events-container {
  width: 580px;
  height: 335px;
  background-color: #ffffff;
  filter: drop-shadow(0px 1px 0px rgba(0,0,0,0.09));
  overflow-y: auto;
}
.event-item {
  display: grid;
  grid-template-columns:  3fr 2fr 1fr 1fr 1fr;
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
  padding: 0 10px;
}

.add-event-button {
  margin-top: 1px;
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
