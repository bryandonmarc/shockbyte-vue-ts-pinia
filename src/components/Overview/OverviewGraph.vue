<template>
  <div class="flex flex-1 items-stretch">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import type { Occupancy } from '@/types/data'

export interface OverviewProps {
  items: Occupancy[]
}

import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps<OverviewProps>()

const chartData: ChartData<'line'> = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Birds',
      data: props.items.reduce(
        (acc, curr) => {
          const date = new Date(curr.created_at)
          // https://stackoverflow.com/a/24481597
          const index = (date.getDay() + 6) % 7
          acc[index] += curr.birds
          return acc
        },
        [0, 0, 0, 0, 0, 0, 0]
      ),
      fill: true,
      borderColor: '#0E9CFF',
      backgroundColor: 'rgba(14, 156, 255, 0.2)',
      tension: 0.4
    },
    {
      label: 'Eggs',
      data: props.items.reduce(
        (acc, curr) => {
          const date = new Date(curr.created_at)
          const index = (date.getDay() + 6) % 7
          acc[index] += curr.eggs
          return acc
        },
        [0, 0, 0, 0, 0, 0, 0]
      ),
      fill: true,
      borderColor: '#744F99',
      backgroundColor: 'rgba(116, 79, 153, 0.2)',
      tension: 0.4
    }
  ]
}

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.2)'
      },
      border: {
        dash: [4, 4]
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)',
        font: {
          size: 12,
          lineHeight: '15px'
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.2)'
      },
      border: {
        dash: [4, 4]
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)',
        font: {
          size: 12,
          lineHeight: '15px'
        }
      }
    }
  }
}
</script>
