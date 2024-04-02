<script>
import axios from 'axios'

export default {
  data() {
    return {
      filters: []
    }
  },
  created() {
    this.fetchFilters()
  },
  methods: {
    fetchFilters() {
      axios.get('/api/filters')
        .then(response => {
          this.filters = response.data
        })
        .catch(error => {
          console.error('There was an error fetching the filters: ', error)
        });
    },
    applyFilter(filterId) {
      // Placeholder for applying a filter
      console.log("Applying filter with ID: ", filterId);
    },
  }
}
</script>

<template>
  <div>
    <h2>Available Filters</h2>
    <ul>
      <li v-for="filter in filters" :key="filter.id">
        {{ filter.name }}
        <button @click="applyFilter(filter.id)">Apply</button>
      </li>
    </ul>
  </div>
</template>
