<template>
  <div id="home">
    <b-row>
      <b-col cols="3">
        <TemperatureCard :headerText="channel.field1" :data="lastFeed.field1" unit="°C"/>
      </b-col>
      <b-col cols="9">
        <b-row class="mb-3">
          <b-col cols="8">
            <Date :date="lastFeed.created_at"/>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">
            <Card :headerText="channel.field2" :data="lastFeed.field2" unit="%"/>
          </b-col>
          <b-col cols="4">
            <Card :headerText="channel.field3" :data="lastFeed.field3" unit=""/>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">
            <Card :headerText="channel.field4" :data="lastFeed.field4" unit="m/s"/>
          </b-col>
          <b-col cols="4">
            <Card :headerText="channel.field5" :data="lastFeed.field5" unit="cm"/>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">
            <Card headerText="Water Level" :data="lastFeed.field6" unit=""/>
          </b-col>
          <b-col cols="4">
            <Card :headerText="channel.field8" :data="lastFeed.field8" unit="°C"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>  
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Date from '@/components/Date.vue'
import TemperatureCard from '@/components/TemperatureCard.vue'

export default {
  name: 'Home',
  props: {
    feeds: Array,
    channel: Object
  },
  components: {
    Card,
    Date,
    TemperatureCard
  },
  computed: {
    lastFeed() {
      return this.feeds[this.feeds.length - 1]
    }
  }
}
</script>

<style scoped>
#home {
  margin-top: 1%;

  margin-left: 20%;
  margin-right: 20%;
  width: 80%;
}
h1 {
  text-align: center;
}
</style>
