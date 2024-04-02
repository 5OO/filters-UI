
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const filters = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/filters');
    filters.value = response.data;
  } catch (error) {
    console.error("There was an error fetching the filters:", error);
  }
});

const applyFilter = (filterId) => {
  // Placeholder for applying a filter
  console.log("Applying filter with ID:", filterId);
  // add another request to apply the filter and fetch results
};
</script>

<template>
  <div class="container">
    <h2 class="mt-4">Available Filters</h2>
    <ul class="list-group">
      <li class="list-group-item" v-for="filter in filters" :key="filter.id">
        {{ filter.name }}
        <button class="btn btn-primary" @click="applyFilter(filter.id)">Apply</button>
      </li>
    </ul>
  </div>
</template>
