<template>
  <div id="header">
    <b-navbar type="dark" variant="info">
      <b-navbar-nav>
        <router-link to="/" tag="b-nav-item">Home</router-link>
        <router-link :to="{ name: 'detail', params: { field: field }}" tag="b-nav-item" v-for="field in fields" :key="field.id">{{field}}</router-link>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: 'Header',
  components: {
    
  },
  data() {
    return {
      fields: [
        "Temperature", 
        "Humidity",
        "Wind Direction",
        "Anenometer",
        "Rain Gauge",
        "Water High Level",
        "IronTemp"
      ]
    }
  }
}
</script>

<style scoped>

</style>


