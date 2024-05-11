<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  getEventWithAggregatedParticipants,
  deleteIndividual,
  deleteCompany,
  createIndividual,
  createCompany,
  getPaymentMethods
} from '@/services/api.js';

const eventDetails = ref(null);
const participants = ref([]);
const paymentMethods = ref([]);
const selectedParticipantType = ref('individual');
const router = useRouter();
const route = useRoute();

const individualForm = ref({
  eventId: null,
  firstName: '',
  lastName: '',
  personalID: '',
  paymentMethod: '',
  additionalInfo: ''
});

const companyForm = ref({
  eventId: null,
  legalName: '',
  registrationCode: '',
  numberOfParticipants: null,
  paymentMethod: '',
  additionalInfo: ''
});

const getParticipants = async () => {
  try {
    const response = await getEventWithAggregatedParticipants(route.params.id);
    eventDetails.value = response;
    participants.value = response.participants;
    individualForm.value.eventId = response.eventId;
    companyForm.value.eventId = response.eventId;
  } catch (error) {
    console.error('Error fetching aggregated participants:', error);
    alert('Failed to fetch participants');
  }
};

const getPaymentMethodsList = async () => {
  try {
    paymentMethods.value = await getPaymentMethods();
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    alert('Failed to fetch payment methods');
  }
};

const viewParticipantDetails = (participant) => {
  const path =
    participant.participantType === 'individual'
      ? `/participant/individual/${participant.participantId}/event/${eventDetails.value.eventId}`
      : `/participant/company/${participant.participantId}/event/${eventDetails.value.eventId}`;
  router.push(path);
};

const deleteParticipant = async (participant) => {
  try {
    if (participant.participantType === 'individual') {
      await deleteIndividual(participant.participantId);
    } else {
      await deleteCompany(participant.participantId);
    }
    await getParticipants(); // Refresh the list after deletion
  } catch (error) {
    console.error('Failed to delete participant:', error);
    alert('Failed to delete participant');
  }
};

const addParticipant = async () => {
  try {
    if (selectedParticipantType.value === 'individual') {
      await createIndividual(individualForm.value);
    } else {
      await createCompany(companyForm.value);
    }
    await getParticipants(); // Refresh participants list
    clearForm();
  } catch (error) {
    console.error('Failed to add participant:', error);
    alert('Failed to add participant');
  }
};

const clearForm = () => {
  individualForm.value = {
    eventId: eventDetails.value.eventId,
    firstName: '',
    lastName: '',
    personalID: '',
    paymentMethod: '',
    additionalInfo: ''
  };
  companyForm.value = {
    eventId: eventDetails.value.eventId,
    legalName: '',
    registrationCode: '',
    numberOfParticipants: null,
    paymentMethod: '',
    additionalInfo: ''
  };
};

onMounted(async () => {
  await getParticipants();
  await getPaymentMethodsList();
});
</script>

<template>
  <div>
    <h1>Participants</h1>
    <h2>Event Details</h2>
    <ul>
      <li>Event name: {{ eventDetails?.eventName }}</li>
      <li>Event date: {{ eventDetails?.eventDate }}</li>
      <li>Location: {{ eventDetails?.location }}</li>
    </ul>

    <h2>Participants List</h2>
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Code/ID</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(participant, index) in participants" :key="participant.participantId">
        <td>{{ index + 1 }}</td>
        <td>{{ participant.name }}</td>
        <td>{{ participant.codeOrId }}</td>
        <td>
          <button type="button" class="back-btn" @click="viewParticipantDetails(participant)">View</button>
          <button type="submit" class="update-btn" @click="deleteParticipant(participant)">Delete</button>

        </td>
      </tr>
      </tbody>
    </table>

    <h2>Add Participant</h2>
    <div class="participant-type-selection">
      <input
        type="radio"
        id="individual"
        value="individual"
        v-model="selectedParticipantType"
      />
      <label for="individual">Individual</label>
      <input
        type="radio"
        id="company"
        value="company"
        v-model="selectedParticipantType"
      />
      <label for="company">Company</label>
    </div>


    <form @submit.prevent="addParticipant">
      <div v-if="selectedParticipantType === 'individual'">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="individualForm.firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="individualForm.lastName" required />
        </div>
        <div class="form-group">
          <label for="personalID">Personal ID:</label>
          <input type="text" id="personalID" v-model="individualForm.personalID" required />
        </div>
        <div class="form-group">
          <label for="paymentMethod">Payment Method:</label>
          <select id="paymentMethod" v-model="individualForm.paymentMethod" required>
            <option value="">Select</option>
            <option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="additionalInfo">Additional Info:</label>
          <textarea id="additionalInfo" v-model="individualForm.additionalInfo"></textarea>
        </div>
      </div>

      <div v-else-if="selectedParticipantType === 'company'">
        <div class="form-group">
          <label for="legalName">Legal Name:</label>
          <input type="text" id="legalName" v-model="companyForm.legalName" required />
        </div>
        <div class="form-group">
          <label for="registrationCode">Registration Code:</label>
          <input type="text" id="registrationCode" v-model="companyForm.registrationCode" required />
        </div>
        <div class="form-group">
          <label for="numberOfParticipants">Number of Participants:</label>
          <input type="number" id="numberOfParticipants" v-model="companyForm.numberOfParticipants" required />
        </div>
        <div class="form-group">
          <label for="paymentMethod">Payment Method:</label>
          <select id="paymentMethod" v-model="companyForm.paymentMethod" required>
            <option value="">Select</option>
            <option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="additionalInfo">Additional Info:</label>
          <textarea id="additionalInfo" v-model="companyForm.additionalInfo"></textarea>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="back-btn" @click="router.push('/')">Back</button>
        <button type="submit" class="add-btn">Add Participant</button>
      </div>
    </form>

  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
  text-align: left;
}

span {
  cursor: pointer;
  margin-right: 10px;
  color: blue;
  text-decoration: underline;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #005aa1;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  opacity: 0.9;
}

h2 {
  margin-top: 30px;
  color: #005aa1;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'],
input[type='number'],
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
  justify-content: flex-start;
}
.add-btn {
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

.back-btn:hover {
  opacity: 0.7;
}

.add-btn:hover {
  opacity: 0.7;
}
.participant-type-selection {
  display: flex;
  gap: 20px; /* Adjust spacing between radio buttons as needed */
  align-items: center;
}

</style>
