<template>
    <div id="date">
        <b-card bg-variant="info" text-variant="white" title="Last Feed">
            <b-card-text>
                <h3>{{date.toLocaleDateString()}}</h3>
            </b-card-text>
            <b-card-text>
                <h3>{{date.toLocaleTimeString()}}</h3>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
  name: 'Date',
  props: {
    date: Date
  }
}
</script>
