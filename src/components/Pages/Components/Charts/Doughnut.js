import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  mounted () {
    this.renderChart({
      labels: ['VueJs', 'EmberJs'],
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',
          ],
          data: [10, 90]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
