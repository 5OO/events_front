<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  createCompany,
  createIndividual,
  deleteCompany,
  deleteIndividual,
  getEventWithAggregatedParticipants,
  getPaymentMethods
} from '@/services/api.js'

const eventDetails = ref(null)
const participants = ref([])
const paymentMethods = ref([])
const selectedParticipantType = ref('individual')
const router = useRouter()
const route = useRoute()

const individualForm = ref({
  eventId: null,
  firstName: '',
  lastName: '',
  personalID: '',
  paymentMethod: '',
  additionalInfo: ''
})

const companyForm = ref({
  eventId: null,
  legalName: '',
  registrationCode: '',
  numberOfParticipants: null,
  paymentMethod: '',
  additionalInfo: ''
})

const getParticipants = async () => {
  try {
    const response = await getEventWithAggregatedParticipants(route.params.id)
    eventDetails.value = response
    participants.value = response.participants
    individualForm.value.eventId = response.eventId
    companyForm.value.eventId = response.eventId
  } catch (error) {
    console.error('Error fetching aggregated participants:', error)
    alert('Failed to fetch participants')
  }
}

const getPaymentMethodsList = async () => {
  try {
    paymentMethods.value = await getPaymentMethods()
  } catch (error) {
    console.error('Error fetching payment methods:', error)
    alert('Failed to fetch payment methods')
  }
}

const viewParticipantDetails = (participant) => {
  const path =
    participant.participantType === 'individual'
      ? `/participant/individual/${participant.participantId}/event/${eventDetails.value.eventId}`
      : `/participant/company/${participant.participantId}/event/${eventDetails.value.eventId}`
  router.push(path)
}

const deleteParticipant = async (participant) => {
  try {
    if (participant.participantType === 'individual') {
      await deleteIndividual(participant.participantId)
    } else {
      await deleteCompany(participant.participantId)
    }
    await getParticipants() // Refresh the list after deletion
  } catch (error) {
    console.error('Failed to delete participant:', error)
    alert('Failed to delete participant')
  }
}

const addParticipant = async () => {
  try {
    if (selectedParticipantType.value === 'individual') {
      await createIndividual(individualForm.value)
    } else {
      await createCompany(companyForm.value)
    }
    await getParticipants() // Refresh participants list
    clearForm()
  } catch (error) {
    console.error('Failed to add participant:', error)
    alert('Failed to add participant')
  }
}

const clearForm = () => {
  individualForm.value = {
    eventId: eventDetails.value.eventId,
    firstName: '',
    lastName: '',
    personalID: '',
    paymentMethod: '',
    additionalInfo: ''
  }
  companyForm.value = {
    eventId: eventDetails.value.eventId,
    legalName: '',
    registrationCode: '',
    numberOfParticipants: null,
    paymentMethod: '',
    additionalInfo: ''
  }
}

onMounted(async () => {
  await getParticipants()
  await getPaymentMethodsList()
})
</script>
<template>
      <!-- Header Bar with Text and Image -->
      <div class="d-flex align-items-stretch">
        <h1 class="flex-grow-1 mb-0">Participants</h1>
        <div class="image-container">
          <img src="@/assets/center-img-labeled.jpg" alt="Event">
        </div>
      </div>
  <div class="component">

    <div class="container my-5">

      <!-- Event Details -->
      <div class="mb-4">
        <ul class="list-group">
          <li class="list-group-item">Event name: {{ eventDetails?.eventName }}</li>
          <li class="list-group-item">Event date: {{ eventDetails?.eventDate }}</li>
          <li class="list-group-item">Location: {{ eventDetails?.location }}</li>
        </ul>
      </div>

      <!-- Participants List -->
      <div class="mb-4">
        <table class="table">
          <thead>
          <tr>
            <th class="visually-hidden">#</th>
            <th class="visually-hidden">Name</th>
            <th class="visually-hidden">Code/ID</th>
            <th class="visually-hidden">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(participant, index) in participants" :key="participant.participantId">
            <td>{{ index + 1 }}</td>
            <td>{{ participant.name }}</td>
            <td>{{ participant.codeOrId }}</td>
            <td>
              <span class="text-dark cursor-pointer" @click="viewParticipantDetails(participant)"
                    role="button">View</span>
              <span class="text-dark cursor-pointer" @click="deleteParticipant(participant)" role="button">Delete</span>

            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Participant Form -->
      <div class="mb-4">


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
            <div class="row form-group">
              <label for="firstName" class="col-sm-2 col-form-label">First Name:</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="firstName" v-model="individualForm.firstName" required />
              </div>
            </div>
            <div class="row form-group">
              <label for="lastName" class="col-sm-2 col-form-label">Last Name:</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="lastName" v-model="individualForm.lastName" required />
              </div>
            </div>
            <div class="row form-group">
              <label for="personalID" class="col-sm-2 col-form-label">Personal ID:</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="personalID" v-model="individualForm.personalID" required />
              </div>
            </div>
            <div class="row form-group">
              <label for="paymentMethod" class="col-sm-2 col-form-label">Payment Method:</label>
              <div class="col-sm-4">
                <select class="form-control" id="paymentMethod" v-model="individualForm.paymentMethod" required>
                  <option value="">Select</option>
                  <option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}</option>
                </select>
              </div>
            </div>
            <div class="row form-group">
              <label for="additionalInfo" class="col-sm-2 col-form-label">Additional Info:</label>
              <div class="col-sm-4">
                <textarea class="form-control" id="additionalInfo" v-model="individualForm.additionalInfo"></textarea>
              </div>
            </div>
          </div>

          <div v-else-if="selectedParticipantType === 'company'">
            <div class="row form-group">
              <label for="legalName" class="col-sm-2 col-form-label">Legal Name:</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="legalName" v-model="companyForm.legalName" required />
              </div>
            </div>
            <div class="row form-group">
              <label for="registrationCode" class="col-sm-2 col-form-label">Registration Code:</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" id="registrationCode" v-model="companyForm.registrationCode"
                       required />
              </div>
            </div>
            <div class="row form-group">
              <label for="numberOfParticipants" class="col-sm-2 col-form-label">Number of Participants:</label>
              <div class="col-sm-4">
                <input type="number" class="form-control" id="numberOfParticipants"
                       v-model="companyForm.numberOfParticipants" required />
              </div>
            </div>
            <div class="row form-group">
              <label for="paymentMethod" class="col-sm-2 col-form-label">Payment Method:</label>
              <div class="col-sm-4">
                <select class="form-control" id="paymentMethod" v-model="companyForm.paymentMethod" required>
                  <option value="">Select</option>
                  <option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}</option>
                </select>
              </div>
            </div>
            <div class="row form-group">
              <label for="additionalInfo" class="col-sm-2 col-form-label">Additional Info:</label>
              <div class="col-sm-4">
                <textarea class="form-control" id="additionalInfo" v-model="companyForm.additionalInfo"></textarea>
              </div>
            </div>
          </div>


          <div class="form-actions">
            <button type="button" class="back-btn" @click="router.push('/')">Back</button>
            <button type="submit" class="add-btn">Add Participant</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>


<style>
.image-container {
  width: auto;
  max-width: 100%;
  overflow: hidden;
  background-color: #005aa1;
  color: white;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #005aa1;
  color: white;
}

h1 {
  color: white;
  background-color: #005aa1;
  padding-left: 20px;
  margin-bottom: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.component {
  padding-left: 5px;
  padding-bottom: 1px;
  background-color: #ffffff;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.list-group-item {
  border: none; /* Removes borders */
  background-color: transparent; /* Removes background, making it transparent */
}

.list-group {
  max-width: 400px;
  margin-top: 0;

}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}


.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
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

.cursor-pointer {
  cursor: pointer;
  padding: 10px;
  color: black;
  text-transform: uppercase;
}


.text-dark.cursor-pointer:hover {
  color: red; /* Example of a neutral gray hover color for the View link */
}

.cursor-pointer:hover {
  text-decoration: underline;
}


</style>