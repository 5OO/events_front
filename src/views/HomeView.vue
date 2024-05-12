<script setup>
import FutureEvents from '../components/FutureEvents.vue'
import PastEvents from '@/components/PastEvents.vue'
</script>

<template>

  <div class="d-flex align-items-stretch">
    <div class="text-box flex-grow-1 mb-0">
      <p>
        <strong>Upcoming Events:</strong>
        Get a jumpstart on your week!
        See all your upcoming events and workshops in one place.
        Click to view details and register.
      </p>
    </div>
    <div class="image-container">
      <img src="@/assets/pilt.jpg" alt="Event">
    </div>
  </div>

  <div class="home-grid">
    <FutureEvents />
    <PastEvents />
  </div>
</template>

<style>
.image-container {
  max-width: 100%;
  overflow: hidden;
}
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-box {
  max-width: 600px;
  word-wrap: normal;
  padding-left: 20px;
  padding-right: 20px;
}
.home-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  row-gap: 20px;
  column-gap: 20px;
  max-width: 1200px;
  margin-top: 20px;
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

