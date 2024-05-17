<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCompanyByIdAndEventId, updateCompany, getPaymentMethods } from '@/services/api.js';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const toast = useToast();
const company = ref(null);
const paymentMethods = ref([]);
const router = useRouter();
const route = useRoute();

const fetchCompany = async () => {
  try {
    company.value = await getCompanyByIdAndEventId(route.params.participantId, route.params.eventId);
  } catch (error) {
    console.error('Error fetching company details:', error);
    toast.error(error.message || 'Failed to fetch company details', {
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
    toast.error(error.message || 'Failed to fetch payment methods', {
      position: 'top',
      duration: 5000
    });
  }
};

const updateCompanyDetails = async () => {
  try {
    await updateCompany(company.value.participantId, company.value);
    toast.success('Company details updated successfully');
    await router.push(`/events/${route.params.eventId}/participants`);
  } catch (error) {
    console.error('Error updating company details:', error);
    toast.error(error.message || 'Failed to update company details', {
      position: 'top',
      duration: 5000
    });
  }
};

onMounted(async () => {
  await fetchCompany();
  await fetchPaymentMethods();
});
</script>

<template>
    <div class="d-flex align-items-stretch">
      <h1 class="flex-grow-1 mb-0">Company Details</h1>
      <div class="image-container">
        <img src="@/assets/center-img-labeled.jpg" alt="Event">
      </div>
    </div>
  <div class="container">

    <form v-if="company" @submit.prevent="updateCompanyDetails">
      <div class="form-group">
        <label for="legalName">Legal Name:</label>
        <input type="text" id="legalName" v-model="company.legalName" required />
      </div>
      <div class="form-group">
        <label for="registrationCode">Registration Code:</label>
        <input type="text" id="registrationCode" v-model="company.registrationCode" required />
      </div>
      <div class="form-group">
        <label for="numberOfParticipants">Number of Participants:</label>
        <input type="number" id="numberOfParticipants" v-model="company.numberOfParticipants" required />
      </div>
      <div class="form-group">
        <label for="paymentMethod">Payment Method:</label>
        <select id="paymentMethod" v-model="company.paymentMethod" required>
          <option value="">Select</option>
          <option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="additionalInfo">Additional Info:</label>
        <textarea id="additionalInfo" v-model="company.additionalInfo"></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="back-btn" @click="router.push(`/events/${route.params.eventId}/participants`)">Back</button>
        <button type="submit" class="update-btn">Update</button>
      </div>
    </form>
  </div>
</template>

<style scoped>


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
h1 {
  color: white;
  background-color: #005aa1;
  padding-left: 20px;
}

.container {
  padding: 20px;
  background-color: #ffffff;
}

.form-group {
  display: flex;
  align-items: center;
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
  flex: 2;
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