<template>
  <div id="app">
    <Header/>
    <router-view :feeds="feeds" :channel="channel" :key="$route.fullPath" v-if="isFetched"/>
    <h1 v-else>Loading...</h1>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import io from 'socket.io-client';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      feeds: [],
      channel: {},
      isFetched: false,
      socket : io(window.location.hostname + ":5000")
    }
  },
  mounted() {
    this.socket.emit("start", this.isFetched)
    
    this.socket.on("receiveData", (weatherInfo) => {
      weatherInfo.feeds.forEach(feed => {
        feed.field1 = parseInt(feed.field1);
        feed.field2 = parseInt(feed.field2);
        feed.field3 = parseInt(feed.field3);
        feed.field4 = parseInt(feed.field4);
        feed.field5 = parseInt(feed.field5);
        feed.field6 = parseInt(feed.field6);
        feed.field7 = parseInt(feed.field7);
        feed.field8 = parseInt(feed.field8);

        feed.created_at = new Date(feed.created_at)
      })

      this.feeds = weatherInfo.feeds
      this.channel = weatherInfo.channel
      this.isFetched = true
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  h1 {
    margin-top: 5%
  }
}
</style>
