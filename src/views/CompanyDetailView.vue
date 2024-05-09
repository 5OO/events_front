<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCompanyByIdAndEventId, updateCompany, getPaymentMethods } from '@/services/api.js';

const company = ref(null);
const paymentMethods = ref([]);
const router = useRouter();
const route = useRoute();

const fetchCompany = async () => {
  try {
    company.value = await getCompanyByIdAndEventId(route.params.participantId, route.params.eventId);
  } catch (error) {
    console.error('Error fetching company details:', error);
    alert('Failed to fetch company details');
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

const updateCompanyDetails = async () => {
  try {
    await updateCompany(company.value.participantId, company.value);
    alert('Company details updated successfully');
    router.push(`/events/${route.params.eventId}/participants`);
  } catch (error) {
    console.error('Error updating company details:', error);
    alert('Failed to update company details');
  }
};

onMounted(async () => {
  await fetchCompany();
  await fetchPaymentMethods();
});
</script>

<template>
  <div>
    <h1>Company Details</h1>
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
h1 {
  margin-bottom: 20px;
  color: #005aa1;
}
.form-group {
  display: flex;
  align-items: center; /* Vertically center aligns the label and input */
  gap: 10px;
  margin-bottom: 20px;
}

label {
  width: 200px; /* Adjust the width as necessary */
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