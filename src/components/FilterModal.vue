<script setup>

import { ref, watch } from 'vue'
import axios from 'axios'
import PvDialog from 'primevue/dialog'
import PvButton from 'primevue/button'
import PvInputText from 'primevue/inputtext'
import { eventBus } from '@/eventBus.js'
import PvDropdown from 'primevue/dropdown'
import PvCalendar from 'primevue/calendar'
import PvInputNumber from 'primevue/inputnumber'

const showDialog = ref(false)
const filterName = ref('')
const criteria = ref([
  { fieldName: '', comparisonOperator: '', criteriaValue: '', comparisonOptions: [], fieldType: '' }
])
const addCriteria = () => {
  criteria.value.push({
    fieldName: '',
    comparisonOperator: '',
    criteriaValue: '',
    comparisonOptions: [],
    fieldType: ''
  })
}

const removeCriteria = (index) => {
  criteria.value.splice(index, 1)
}

const fieldOptions = ref([
  { label: 'Title', value: 'title' },
  { label: 'Original Title', value: 'originalTitle' },
  { label: 'Release Date', value: 'releaseDate' },
  { label: 'Vote Average', value: 'voteAverage' },
  { label: 'Popularity', value: 'popularity' }
])

const comparisonOptionsByType = ref({
  string: [
    { label: 'Contains', value: 'contains' },
    { label: 'Starts With', value: 'startsWith' },
    { label: 'Ends With', value: 'endsWith' },
    { label: 'Equals', value: 'equals' }
  ],
  numeric: [
    { label: 'Greater Than', value: '>' },
    { label: 'Less Than', value: '<' },
    { label: 'Equals', value: '=' }
  ],
  date: [
    { label: 'After', value: 'after' },
    { label: 'Before', value: 'before' },
    { label: 'On', value: 'equals' },
    { label: 'After or On', value: '>=' },
    { label: 'Before or On', value: '<=' }
  ]
})

const updateComparisonOptions = (criterion) => {
  let type
  switch (criterion.fieldName) {
    case 'voteAverage':
    case 'popularity':
      type = 'numeric'
      break
    case 'originalTitle':
    case 'title':
      type = 'string'
      break
    case 'releaseDate':
      type = 'date'
      break
    default:
      type = 'string'
  }
  criterion.fieldType = type
  criterion.comparisonOptions = comparisonOptionsByType.value[type]
}

const saveFilter = async () => {
  try {
    const formattedCriteria = criteria.value.map(criterion => {
      if (criterion.fieldType === 'date' && criterion.criteriaValue) {
        const date = new Date(criterion.criteriaValue)
        const formattedDate = date.toISOString().split('T')[0]
        return { ...criterion, criteriaValue: formattedDate }
      }
      return criterion
    })
    const response = await axios.post('http://localhost:8080/api/filters', {
      name: filterName.value,
      criteria: formattedCriteria
    })
    console.log('Filter saved:', response.data)
    filterName.value = ''
    criteria.value = [{
      fieldName: '',
      comparisonOperator: '',
      criteriaValue: '',
      comparisonOptions: [],
      fieldType: ''
    }]
    showDialog.value = false
    eventBus.emit('filter-saved', { message: '... refreshing list ...' })
  } catch (error) {
    console.error('Error saving filter:', error)
  }
}

criteria.value.forEach((criterion) => {
  watch(() => criterion.fieldName, () => {
    updateComparisonOptions(criterion)
  }, { immediate: true })
})

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
        <PvInputText id="filterName" v-model="filterName" placeholder="Enter filter name" />
      </div>
      <!-- Criteria Rows -->
      <div v-for="(criterion, index) in criteria" :key="index" class="p-field criteria-row">
        <PvDropdown v-model="criterion.fieldName" :options="fieldOptions" placeholder="Select Field Name"
                    optionLabel="label" optionValue="value" />
        <PvDropdown v-model="criterion.comparisonOperator" :options="criterion.comparisonOptions"
                    placeholder="Select Comparison Operator" optionLabel="label" optionValue="value" />

        <PvCalendar v-if="criterion.fieldType === 'date'" v-model="criterion.criteriaValue"
                    placeholder="Select a date" />
        <PvInputNumber v-else-if="criterion.fieldType === 'numeric'" v-model="criterion.criteriaValue"
                       placeholder="Enter a number" />
        <PvInputText v-else v-model="criterion.criteriaValue" placeholder="Enter text" />

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