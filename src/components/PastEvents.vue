<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchPastEvents } from '../services/api.js';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const toast = useToast();
const events = ref([]);
const router = useRouter();

const getEvents = async () => {
  try {
    events.value = await fetchPastEvents();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    toast.error('Failed to fetch past events', {
      position: 'top',
      duration: 6000
    });
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
  <div>
    <div class="events-header">Past Events</div>
    <ol class="events-container">
      <li v-for="(event, index) in events" :key="event.eventId" class="event-item">
        <span class="event-name">{{ index + 1 }}. {{ event.eventName }}</span>
        <span class="event-date">{{ formatDate(event.eventDateTime) }}</span>
        <span class="event-actions-add">
          <button @click="addParticipants(event.eventId)">Participants</button>
        </span>
      </li>
    </ol>
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
  padding: 0 10px;
}

</style>
