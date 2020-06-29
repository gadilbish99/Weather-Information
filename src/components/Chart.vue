<template>
  <div id="chart">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: 'Chart',
  props: {
    type: {
      type: String,
      default: 'line'
    },
    labels: {
      type: Array,
      required: true
    },
    datasets: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default() {
        return {}
      }
     },
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = new Chart(this.$refs.chart, {
      type: this.type,

      data: {
          labels: this.labels,
          datasets: this.datasets
      },

      options: this.options
    });
  },
  beforeDestroy() {
      if (this.chart) {
          this.chart.destroy()
      }
  },
  watch: {
    labels: function (val) {
      this.chart.data.labels = val
      this.chart.update()
    },
    datasets: function (val) {
      this.chart.data.datasets = val
      this.chart.update()
    }
  }
}
</script>

<style scoped>

</style>