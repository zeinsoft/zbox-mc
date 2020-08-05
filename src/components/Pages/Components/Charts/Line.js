import {Line} from 'vue-chartjs'

export default {
  extends: Line,
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
  mounted() {
    this.renderChart({
      labels: this.labels,
      datasets: this.datasets,
    }, this.options)
  }
}
