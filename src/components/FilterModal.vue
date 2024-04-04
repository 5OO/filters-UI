<script setup>

import { ref } from 'vue';
import axios from 'axios';
import PvDialog from 'primevue/dialog';
import PvButton from 'primevue/button';
import PvInputText from 'primevue/inputtext';

const showDialog = ref(false);
const filterName = ref('');
const criteria = ref([
  {fieldName:'',comparisonOperator:'', criteriaValue:''}
]);
const addCriteria = () => {
  criteria.value.push({fieldName:'',comparisonOperator:'', criteriaValue:''});
}

const removeCriteria = (index) => {
  criteria.value.splice(index, 1);
}

const saveFilter = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/filters', {
      name: filterName.value,
      criteria: criteria.value
    })
    console.log('Filter saved:', response.data)
    // Reset form and hide dialog
    filterName.value = ''
    criteria.value = [{fieldName:'',comparisonOperator:'', criteriaValue:''}]
    showDialog.value = false
    // Optionally refresh the list of filters here
  } catch (error) {
    console.error('Error saving filter:', error)
  }

}
</script>

  <template>
    <PvButton label="Create New Filter" @click="showDialog = true" class="create-filter-button" />
    <PvDialog v-model:visible="showDialog" :modal="true" :closable="false" :style="{ width: '60rem' }">
      <template #header>
        <h3>Create New Filter</h3>
      </template>
        <div class="p-fluid">
          <div class="p-field filter-name">
            <label for="filterName">Filter Name</label>
            <PvInputText id="filterName" v-model="filterName" placeholder="Enter filter name"/>
          </div>
          <!-- Criteria Rows -->
          <div v-for="(criterion, index) in criteria" :key="index" class="p-field criteria-row">
            <PvInputText v-model="criterion.fieldName" placeholder="Field Name"/>
            <PvInputText v-model="criterion.comparisonOperator" placeholder="Comparison Operator"/>
            <PvInputText v-model="criterion.criteriaValue" placeholder="Criteria Value"/>
            <PvButton label="remove row" @click="removeCriteria(index)" />
          </div>
          <PvButton label="Add Criteria" @click="addCriteria" />
        </div>

      <template #footer>
        <PvButton label="Save" @click="saveFilter" />
        <PvButton label="Cancel" @click="showDialog = false" />
      </template>
    </PvDialog>
  </template>

<style scoped>
.create-filter-button {
  display: block;
  margin-left: auto;
}

.filter-name {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px;
}
.criteria-row {
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 5px;
}
</style>