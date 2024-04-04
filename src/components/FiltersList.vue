<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import axios from 'axios'
import Button from 'primevue/button'
import { eventBus } from '/src/eventBus.js'

const filters = ref([])
const filteredMovies = ref([])
const filterApplied = ref(false)


const handleFilterSaved = (data) => {
  console.log(data.message)
  fetchFilters()
}

const fetchFilters = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/filters')
    filters.value = response.data
    console.log(' filters list ', filters.value)
  } catch (error) {
    console.error('There was an error fetching the filters:', error)
  }
}

onMounted(fetchFilters)

onMounted(() => {
  eventBus.on('filter-saved', handleFilterSaved)
})

onUnmounted(() => {
  eventBus.off('filter-saved', handleFilterSaved)
})

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
</script>

<template>
  <div class="container">
    <h2 class="mt-4">Available Filters</h2>
    <ul class="list-group filter-list">
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
      <ul class="movie-list">
        <li v-for="movie in filteredMovies" :key="movie.id">
          {{ movie.title }} - {{ movie.releaseDate }}
        </li>
      </ul>
    </div>
    <p v-if="filterApplied && !filteredMovies.length">No movies found matching the selected filter criteria.</p>
  </div>
</template>

<style scoped>
.filter-list li:nth-child(odd), .movie-list li:nth-child(odd) {
  background-color: #f9f9f9;
}

.filter-list li:nth-child(even), .movie-list li:nth-child(even) {
  background-color: #fff;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.container {
  margin-bottom: 20px;
}

.movie-list li, .filter-list li {
  padding: 10px;
  border: 1px solid #ddd;
  list-style-type: none;
}
</style>
