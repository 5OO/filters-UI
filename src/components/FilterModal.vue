<script setup>

import { ref } from 'vue';
import axios from 'axios';
import PvDialog from 'primevue/dialog';
import PvButton from 'primevue/button';
import PvInputText from 'primevue/inputtext';

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
    <PvButton label="Create New Filter" @click="showDialog = true" />
    <PvDialog v-model:visible="showDialog" :modal="true" :closable="false">
      <template #header>
        <h3>Create New Filter</h3>
      </template>
        <div class="p-fluid">
          <div class="p-field">
            <label for="filterName">Filter Name</label>
            <PvInputText id="filterName" v-model="filterName" placeholder="Enter 2  filter name"/>
          </div>
          <!-- Add more fields   -->
        </div>
      <template #footer>
        <PvButton label="Save" @click="saveFilter" />
        <PvButton label="Cancel" @click="showDialog = false" />
      </template>
    </PvDialog>
  </template>

<style scoped>
</style>