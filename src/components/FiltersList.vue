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
    }
  }
}
</script>

<template>

</template>

<style scoped>
.filters-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>