<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const filters = ref([])

const fetchFilters = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/filters')
    filters.value = response.data
    console.log(filters.value)
  } catch (error) {
    console.error('There was an error fetching the filters:', error)
  }
}

const filteredMovies = ref([]);
const applyFilter = async (filterId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/filters/${filterId}/movies`)
    console.log('Applying filter with ID:', filterId)
    console.log(`response data `, response.data)
    filteredMovies.value = response.data;
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
          <button class="btn btn-primary" @click="applyFilter(filter.id)">Apply</button>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <h3>Filtered Movies</h3>
    <ul>
      <li v-for="movie in filteredMovies" :key="movie.id">
        {{ movie.title }} - {{ movie.releaseDate }}
      </li>
    </ul>
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
}
</style>
