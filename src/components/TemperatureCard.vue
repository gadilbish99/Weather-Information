<template>
    <div id="temperature-card">
        <b-card
            :header="headerText"
            header-tag="header"
            header-bg-variant="info"
            header-text-variant="white"
        >
            <b-card-text class="font-weight-bold">
                <h1>{{data + unit}}</h1>
            </b-card-text>
            <LinearGauge :value="data"/>
        </b-card>
    </div>
</template>

<script>
import LinearGauge from '@/components/LinearGauge.vue'

export default {
  name: 'TemperatureCard',
  props: {
    headerText: String,
    data: Number,
    unit: String
  },
  components: {
    LinearGauge
  }
}
</script>

<style scoped>
div {
  max-width: 20rem;
}
</style>
