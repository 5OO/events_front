<script setup>
import FutureEvents from '../components/FutureEvents.vue'
import PastEvents from '@/components/PastEvents.vue'
</script>

<template>
  <div class="home-grid">
    <div class="text-box p-3 h-100 d-flex flex-column justify-content-center">
      <p>
        <strong>Upcoming Events:</strong> Get a jumpstart on your week! See all your upcoming events and workshops in one place. Click to view details and register.
      </p>
      <p>
        <strong>Manage Participants:</strong> Stay organized! Easily add, edit, and remove participants from your events. Track attendance and registrations with a few clicks.
      </p>
      <p>
        <strong>Seamless Booking:</strong> Booking events is a breeze. Our intuitive interface makes it easy to find the perfect event and secure your spot.
      </p>
    </div>
    <div class="image-box">
      <img src="@/assets/pilt.jpg" alt="This is green forest">
    </div>
    <FutureEvents />
    <PastEvents />
  </div>
</template>

<style>
.home-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  row-gap: 20px;
  column-gap: 20px;
  max-width: 1200px;
  margin: auto;
}

.text-box {
  background-color: #005aa1;
  color: white;
  height: 319px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
  overflow: hidden;
}

.image-box {
  width: 100%;
  height: 319px;
  object-fit: cover;
}

.image-box img {
  width: 100%;
  height: auto;
}

FutureEvents, PastEvents {
  height: auto;
}


</style>

