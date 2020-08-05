import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    labels: {
      type: [Object, Array],
    },
    datasets: {
      type: [Object, Array],
    },
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: this.datasets
    }, {responsive: true, maintainAspectRatio: false})
  }
}
