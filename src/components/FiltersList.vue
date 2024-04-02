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
        })
    },
    applyFilter(filterId) {
      // Placeholder for applying a filter
      console.log('Applying filter with ID: ', filterId)
    }
  }
}
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
