import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    labels: {
      type: [Object, Array],
    },
    datasets: {
      type: [Object, Array],
    },
    options : {
      type: Object
    }
  },
  methods: {

  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: this.datasets,
    }, this.options)
  }
}
