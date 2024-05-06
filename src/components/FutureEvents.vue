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

onMounted(getEvents);
</script>

<template>
  <div class="events-container">
    <h1>Future Events</h1>
    <ol>
      <li v-for="event in events" :key="event.eventId">
        <div class="event-item">
          <span class="event-name">{{ event.eventName }}</span>
          <span class="event-date">{{ formatDate(event.eventDateTime) }}</span>
          <span class="event-actions-add">
            <button @click="addParticipants(event.eventId)">Participants</button>
          </span>
          <span class="event-actions">
            <button @click="removeEvent(event.eventId)">X</button>
          </span>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.events-container {
  margin: auto;
  width: 90%;
  max-width: 600px;
}

.event-item {
  display: grid;
  grid-template-columns: 3fr 2fr 1fr 1fr;
  gap: 8px; /* Space between grid items */
  align-items: center;
  padding: 8px 0;
}

.event-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-date {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}

.event-actions-add button {
  margin-right: 4px;

}.event-actions button {
  margin-right: 4px;
}
</style>
