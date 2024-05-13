<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getIndividualByIdAndEventId, updateIndividual, getPaymentMethods } from '@/services/api.js';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const toast = useToast();
const individual = ref(null);
const paymentMethods = ref([]);
const router = useRouter();
const route = useRoute();

const fetchIndividual = async () => {
  try {
    individual.value = await getIndividualByIdAndEventId(route.params.participantId, route.params.eventId);
  } catch (error) {
    console.error('Error fetching individual details:', error);
    toast.error('Failed to fetch individual details', {
      position: 'top',
      duration: 5000
    });
  }
};

const fetchPaymentMethods = async () => {
  try {
    paymentMethods.value = await getPaymentMethods();
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    toast.error('Failed to fetch payment methods', {
      position: 'top',
      duration: 5000
    });
  }
};

const updateIndividualDetails = async () => {
  try {
    await updateIndividual(individual.value.participantId, individual.value);
    toast.success('Individual details updated successfully', {
      position: 'top',
      duration: 4000
    });
    router.push(`/events/${route.params.eventId}/participants`);
  } catch (error) {
    console.error('Error updating individual details:', error);
    toast.error('Failed to update individual details', {
      position: 'top',
      duration: 5000
    });
  }
};

onMounted(async () => {
  await fetchIndividual();
  await fetchPaymentMethods();
});
</script>

<template>

    <div class="d-flex align-items-stretch">
      <h1 class="flex-grow-1 mb-0">Individual Details</h1>
      <div class="image-container">
        <img src="@/assets/center-img-labeled.jpg" alt="Event">
      </div>
    </div>
  <div  class="container">

    <form v-if="individual" @submit.prevent="updateIndividualDetails">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="individual.firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="individual.lastName" required />
      </div>
      <div class="form-group">
        <label for="personalID">Personal ID:</label>
        <input type="text" id="personalID" v-model="individual.personalID" required />
      </div>
      <div class="form-group">
        <label for="paymentMethod">Payment Method:</label>
        <select id="paymentMethod" v-model="individual.paymentMethod" required>
          <option value="">Select</option>
          <option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="additionalInfo">Additional Info:</label>
        <textarea id="additionalInfo" v-model="individual.additionalInfo"></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="back-btn" @click="router.push(`/events/${route.params.eventId}/participants`)">Back</button>
        <button type="submit" class="update-btn">Update</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

.container {
  padding: 20px;
  background-color: #ffffff;
}



h1 {
  color: white;
  background-color: #005aa1;
  padding-left: 20px;
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

.form-group {
  display: flex;
  align-items: center; /* Vertically center aligns the label and input */
  gap: 10px;
  margin-bottom: 20px;
}

label {
  width: 200px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea,
select {
  flex: 2; /* Input will expand to take available width */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 400px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}
.update-btn {
  background-color: #005aa1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-btn {
  background-color: #a0a0a0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.update-btn:hover {
  opacity: 0.9;
}
.back-btn:hover {
  opacity: 0.9;
}
</style>