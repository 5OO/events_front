<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getIndividualByIdAndEventId, updateIndividual, getPaymentMethods } from '@/services/api.js';

const individual = ref(null);
const paymentMethods = ref([]);
const router = useRouter();
const route = useRoute();

const fetchIndividual = async () => {
  try {
    individual.value = await getIndividualByIdAndEventId(route.params.participantId, route.params.eventId);
  } catch (error) {
    console.error('Error fetching individual details:', error);
    alert('Failed to fetch individual details');
  }
};

const fetchPaymentMethods = async () => {
  try {
    paymentMethods.value = await getPaymentMethods();
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    alert('Failed to fetch payment methods');
  }
};

const updateIndividualDetails = async () => {
  try {
    await updateIndividual(individual.value.participantId, individual.value);
    alert('Individual details updated successfully');
    router.push(`/event/${route.params.eventId}/participants`);
  } catch (error) {
    console.error('Error updating individual details:', error);
    alert('Failed to update individual details');
  }
};

onMounted(async () => {
  await fetchIndividual();
  await fetchPaymentMethods();
});
</script>

<template>
  <div>
    <h1>Individual Details</h1>
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
        <button type="submit" class="update-btn">Update</button>
        <button type="button" @click="router.push(`/events/${route.params.eventId}/participants`)">Back</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
  color: #005aa1;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.update-btn {
  background-color: #005aa1;
  color: white;
}

.update-btn:hover {
  opacity: 0.9;
}
</style>