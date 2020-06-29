<template>
    <div id="card">
        <b-card
            :header="headerText"
            header-tag="header"
            header-bg-variant="info"
            header-text-variant="white"
        >
            <b-card-text class="font-weight-bold">
              <h1>{{data + unit}}</h1>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    headerText: String,
    data: Number,
    unit: String
  }
}
</script>

<style scoped>
div {
  max-width: 20rem;
}
</style>
