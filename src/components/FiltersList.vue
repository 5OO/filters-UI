<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Button from 'primevue/button';

const filters = ref([])
const filteredMovies = ref([])
const filterApplied = ref(false)

const fetchFilters = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/filters')
    filters.value = response.data
    console.log(filters.value)
  } catch (error) {
    console.error('There was an error fetching the filters:', error)
  }
}

const applyFilter = async (filterId) => {
  filterApplied.value = true
  try {
    const response = await axios.get(`http://localhost:8080/api/filters/${filterId}/movies`)
    console.log('Applying filter with ID:', filterId)
    console.log(`response data `, response.data)
    filteredMovies.value = response.data
  } catch (error) {
    console.error(`There was an error applying filter ${filterId}:`, error)
  }
}
onMounted(fetchFilters)
</script>

<template>
  <div class="container">
    <h2 class="mt-4">Available Filters</h2>
    <ul class="list-group">
      <li class="list-group-item" v-for="filter in filters" :key="filter.id">
        {{ filter.name }}
        <div class="button-container">
          <Button class="btn btn-primary" @click="applyFilter(filter.id)">Apply</Button>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <div v-if="filterApplied && filteredMovies.length">
      <h3>Filtered Movies</h3>
      <ul>
        <li v-for="movie in filteredMovies" :key="movie.id">
          {{ movie.title }} - {{ movie.releaseDate }}
        </li>
      </ul>
    </div>
    <p v-if="filterApplied && !filteredMovies.length">No movies found matching the selected filter criteria.</p>
  </div>
</template>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  margin-left: auto; /* Pushes the button to the right */
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
