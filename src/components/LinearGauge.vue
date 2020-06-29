<template>
  <canvas class="canvas-gauges"></canvas>
</template>

<script>
import { LinearGauge } from 'canvas-gauges'
export default {
  props: {
    value: Number,
    options: {
      type: Object,
      default: () => ({
          width: 120,
        height: 522,
        units: "°C",
        minValue: 0,
        startAngle: 90,
        ticksAngle: 180,
        valueBox: false,
        maxValue: 220,
        majorTicks: [
            "0",
            "20",
            "40",
            "60",
            "80",
            "100",
            "120",
            "140",
            "160",
            "180",
            "200",
            "220"
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                "from": 100,
                "to": 220,
                "color": "rgba(200, 50, 50, .75)"
            }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear",
        barWidth: 20
      })
    }
  },
  data: function () {
    return {
      chart: null
    }
  },
  mounted: function () {
    this.chart = new LinearGauge(Object.assign({}, this.options, {renderTo: this.$el, value: this.value}))
      .draw()
  },
  beforeDestroy: function () {
    this.chart.destroy()
  },
  watch: {
    value: function (val) {
      this.chart.value = val
      this.chart.destroy()
      this.chart = new LinearGauge(Object.assign({}, this.options, {renderTo: this.$el, value: this.value}))
      .draw()
    }
  }
}
</script>