<script setup>

import { ref } from 'vue';
import axios from 'axios';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const showDialog = ref(false);
const filterName = ref('');

const saveFilter = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/filters', {
      name: filterName.value
      // Include other fields as necessary
    })
    console.log('Filter saved:', response.data)
    // Reset form and hide dialog
    filterName.value = ''
    showDialog.value = false
    // Optionally refresh the list of filters here
  } catch (error) {
    console.error('Error saving filter:', error)
  }

}
</script>

<template>
  <template>
    <Button label="Create New Filter" @click="showDialog = true" />
    <Dialog v-model:visible="showDialog" :modal="true" :closable="false">
      <template #header>
        <h3>Create New Filter</h3>
      </template>
      <template #content>
        <div class="p-fluid">
          <div class="p-field">
            <label for="filterName">Filter Name</label>
            <InputText id="filterName" v-model="filterName" placeholder="Enter filter name"/>
          </div>
          <!-- Add more fields as needed -->
        </div>
      </template>
      <template #footer>
        <Button label="Save" @click="saveFilter" />
        <Button label="Cancel" @click="showDialog = false" />
      </template>
    </Dialog>
  </template>

</template>

<style scoped>
</style>