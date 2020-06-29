<template>
  <div id="detail">
      <b-container>
        <b-row>
          <b-col>
            <p>General Chart</p>
            <Chart :labels="labels[0]" :datasets="datasets[0]"/>
          </b-col>
          <b-col>
            <p>Average Daily Chart</p>
            <Chart :labels="labels[1]" :datasets="datasets[1]"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>Weekdaily Chart</p>
            <Chart :labels="labels[2]" :datasets="datasets[2]" type="bar"/>
          </b-col>
          <b-col>
            <p>Hourly Chart</p>
            <Chart :labels="labels[3]" :datasets="datasets[3]" type="bar"/>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";

export default {
  name: 'Detail',
  components: {
    Chart
  },
  props: {
    feeds: Array,
    channel: Object,
    field: {
      required: true
    }
  },
  data() {
    return {
      fieldName: this.keyFinder(this.field),
      groupByDay: this.getGroupByDay(),
      groupByWeekDay: this.getGroupByWeekDay(),
      hourlyData: this.feeds.filter((value, index) => index >= this.feeds.length - 10)
    }
  },
  computed: {
      labels() {
        return [
          this.feeds.map(feed => feed.created_at.toLocaleDateString()),
          Object.keys(this.groupByDay),
          Object.keys(this.groupByWeekDay),
          this.hourlyData.map(feed => feed.created_at.toLocaleTimeString()),
        ]
      },
      datasets() {
          return [
            [{
              label: this.channel[this.fieldName],
              backgroundColor: 'rgb(255, 199, 232)',
              borderColor: 'rgb(255, 199, 232)',
              data: this.feeds.map(feed => feed[this.fieldName])
            }],
            [{
              label: this.channel[this.fieldName],
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: Object.values(this.groupByDay)
            }],
            [{
              label: this.channel[this.fieldName],
              backgroundColor: 'rgb(255, 199, 132)',
              borderColor: 'rgb(255, 199, 132)',
              data: Object.values(this.groupByWeekDay)
            }],
            [{
              label: this.channel[this.fieldName],
              backgroundColor: 'rgb(100, 199, 132)',
              borderColor: 'rgb(100, 199, 132)',
              data: this.hourlyData.map(feed => feed[this.fieldName])
            }]
          ]
      }
  },

  methods: {
    keyFinder(field) {
      let dict = {}
      Object.entries(this.channel).forEach(([key, value]) => dict[value] = key)
      return dict[field]
    },
    getGroupByDay() {
      let data = {}
      this.feeds.map(feed => {
        let date = feed.created_at.toLocaleDateString()
        if (data[date] === undefined)
          data[date] = []

        data[date].push(feed[this.keyFinder(this.field)])
      })
      Object.keys(data).forEach(key => {
        data[key] = (data[key].reduce((sum, value) => sum + value)) / data[key].length
      })
      return data
    },
    getGroupByWeekDay() {
      let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      let keys = Object.keys(this.getGroupByDay()).filter((value, index) => index >= Object.keys(this.getGroupByDay()).length - 7)
      let data = {}
      keys.forEach(key => {
        let day = (new Date(key)).getDay()
        let weekday = weekdays[day]
        data[weekday] = this.getGroupByDay()[key]
      })
      return data
    }
  },
  watch: {
    feeds: function () {
      this.groupByDay =  this.getGroupByDay(),
      this.groupByWeekDay = this.getGroupByWeekDay(),
      this.hourlyData = this.feeds.filter((value, index) => index >= this.feeds.length - 10)
    }
  }
}
</script>

<style scoped>
#detail {
  margin-top: 2%;
}
</style>