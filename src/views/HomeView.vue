<script setup>
import FutureEvents from '../components/FutureEvents.vue'
import PastEvents from '@/components/PastEvents.vue'
</script>

<template>
  <div class="home-page">
    <FutureEvents />
    <PastEvents />
  </div>
</template>

<style>
.home-page {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
</style>
