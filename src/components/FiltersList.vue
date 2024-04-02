<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const filters = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/filters')
    filters.value = response.data
    console.log(filters.value)
  } catch (error) {
    console.error('There was an error fetching the filters:', error)
  }
})

const applyFilter = (filterId) => {
  // Placeholder for applying a filter
  console.log('Applying filter with ID:', filterId)
  // add another request to apply the filter and fetch results
}
</script>

<template>
  <div class="container">
    <h2 class="mt-4">Available Filters</h2>
    <ul class="list-group">
      <li class="list-group-item" v-for="filter in filters" :key="filter.id">
        {{ filter.name }}
        <div class="button-container">
          <button class="btn btn-primary" @click="applyFilter(filter.id)">Apply</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.container {
  margin-top: 20px;
}

.mt-4 {
  margin-top: 1.5rem;
}

.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-primary:focus {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.btn-primary:active {
  color: #fff;
  background-color: #0062cc;
  border-color: #005cbf;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.btn-primary.disabled, .btn-primary:disabled {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:not(:disabled):not(.disabled):active:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.btn-primary:not(:disabled):not(.disabled):active {
  background-color: #0062cc;
  border-color: #005cbf;
}

.btn-primary:not(:disabled):not(.disabled):focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.btn-primary:not(:disabled):not(.disabled):hover {
  background-color: #0069d9;
  border-color: #0062cc;
}


</style>
