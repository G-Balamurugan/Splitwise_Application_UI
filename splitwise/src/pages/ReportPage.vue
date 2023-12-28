<template>
  <div style="width: 100%">
    <div class="container">
      <p class="need-to-pay total">
        Total to Pay: {{ groupWiseReport.totalToPay }}
      </p>
      <p class="need-to-receive total">
        Total to Receive: {{ groupWiseReport.totalToReceive }}
      </p>
    </div>
    <div class="chart-container">
      <div class="chart">
        <canvas ref="groupChart"></canvas>
      </div>
      <div class="chart">
        <canvas ref="categoryChart"></canvas>
      </div>
    </div>

    <!-- <div>
      <p>User-wise Amounts:</p>
      <ul>
        <li v-for="(summary, index) in groupWiseReport.groupSummaryList" :key="index">
          {{ `User ${summary.userId}: Need to Pay - ${summary.totalToPay}, Need to Receive - ${summary.totalToReceive}, In group id - ${summary.groupId}`  }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script src="./js/report-page.js">

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.need-to-receive {
  background-color: #9FBB73;
}

.need-to-pay {
  background-color: #EC8F5E;
}

.total {
  color: white;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
}

.chart {
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.chart-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  height: 80%;
}
@media (max-width: 850px) {
  .chart {
    width: 100%;
  }
}
</style>
