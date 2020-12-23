<template>
  <div class="home">
    <vs-row vs-justify="space-between">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vs-card class="card">
          <div slot="header" class="card-header">
            <h4>
              Today Sales
            </h4>
          </div>
          <div class="card-data">
            <span class="card-value" v-if="!loading">{{ sales.today_sales }}</span>
          </div>
          <div slot="footer">
          </div>
        </vs-card>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vs-card class="card">
          <div slot="header" class="card-header">
            <h4>
              Total Shipping
            </h4>
          </div>
          <div class="card-data">
            <span class="card-value" v-if="!loading">{{ sales.total_shipping }}</span>
          </div>
          <div slot="footer">
          </div>
        </vs-card>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vs-card class="card">
          <div slot="header" class="card-header">
            <h4>
              Total Cancel
            </h4>
          </div>
          <div class="card-data">
            <span class="card-value" v-if="!loading">{{ sales.total_cancel }}</span>
          </div>
          <div slot="footer">
          </div>
        </vs-card>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <vs-card class="card">
          <div slot="header" class="card-header">
            <h4>
              Total Pending
            </h4>
          </div>
          <div class="card-data">
            <span class="card-value" v-if="!loading">{{ sales.total_pending }}</span>
          </div>
          <div slot="footer">
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
    <button @click="setChartData(0)">Client A</button>
    <button @click="setChartData(14)">Client B</button>
    <vs-row>
      <highcharts class="chart" :options="chartOptions"></highcharts>
    </vs-row>
    <vs-row>
      <highcharts class="chart" :options="chartOptionsB"></highcharts>
    </vs-row>
  </div>
</template>

<script>
import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import {Chart} from 'highcharts-vue'
import StockChart from 'highcharts-vue'
import {_} from 'vue-underscore'

Vue.use(HighchartsVue)

export default {
  name: 'Home',
  components: {
    HighchartsVue,
    chart: Chart,
    stockChart: StockChart,
  },
  data() {
    return {
      sales: null,
      salesInYear: null,
      loading: false,
      loadChartData: false,
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Sales in Year'
        },
        series: [{
          showInLegend: false,
          name: 'Sales',
          data: [],
          color: '#6fcd98'
        }],
        xAxis: {
          type: "category",
        },
        yAxis: {
          text: 'sales'
        }
      },
      chartOptionsB: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Sales in Year'
        },
        series: [{
          showInLegend: false,
          name: 'Sales',
          data: [],
          color: '#6fcd98'
        }],
        xAxis: {
          type: "category",
        },
        yAxis: {
          text: 'sales'
        }
      }
    }
  },
  async created() {
    this.getSales();
    await this.getSalesInYear()
  },
  methods: {
    getSales() {
      this.loading = true;
      this.$http({
        url: '/sales-overview',
        method: 'GET'
      })
        .then(resp => {
          this.loading = false;
          this.sales = resp.data.data
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        })
    },
    getSalesInYear() {
      this.loadChartData = true;
      this.$http({
        url: '/year-end',
        method: 'GET'
      })
        .then(resp => {
          this.salesInYear = resp.data.data
          this.chartOptions.series[0].data = this.salesInYear.metric.clicks[0].data
          this.chartOptionsB.series[0].data = this.salesInYear.metric.clicks[14].data
          this.loadChartData = false
        })
        .catch(err => {
          this.loadChartData = false
          console.log(err);
        })
    },
    setChartData(index) {
      this.chartOptions.series[0].data = this.salesInYear.metric.clicks[index].data
    }
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

.card {
  margin: 10px;
}

.card-header {
  display: flex;
  justify-content: left;
}

.card-data {
  display: flex;
  margin: 20px 0;
}

.card-value {
  font-size: 20px;
  margin-left: auto;
}

.chart {
  width: 90%;
  margin: 10px auto;
}
</style>