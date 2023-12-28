import { defineComponent } from "vue";
import Chart from "chart.js/auto";
import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";

export default defineComponent({
  data() {
    return {
    //   categoryWiseReport1: [
    //     {
    //       totalToReceive: 433872.0,
    //       totalToPay: 0.0,
    //       category: "Trip",
    //     },
    //     {
    //       totalToReceive: 8703824.92,
    //       totalToPay: 0.0,
    //       category: "Transportation",
    //     },
    //     {
    //       totalToReceive: 1478.32,
    //       totalToPay: 0.0,
    //       category: "Accommodation",
    //     },
    //     {
    //       totalToReceive: 1000.0,
    //       totalToPay: 0.0,
    //       category: "Others",
    //     },
    //     {
    //       totalToReceive: 1.034800928e7,
    //       totalToPay: 0.0,
    //       category: "Food",
    //     },
    //   ],
    //   groupWiseReport1: {
    //     totalToReceive: 4850.0,
    //     totalToPay: 34850.0,
    //     paymentSummaryList: [
    //       {
    //         userId: 2,
    //         userName: "Sivaguru",
    //         type: "Need to Pay",
    //         amount: 30000.0,
    //       },
    //     ],
    //     groupSummaryList: [
    //       {
    //         userId: 1,
    //         groupId: 2,
    //         groupName: "Plan",
    //         totalToReceive: 4850.0,
    //         totalToPay: 20000.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 1,
    //         groupName: "Tour",
    //         totalToReceive: 4850.0,
    //         totalToPay: 14850.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 3,
    //         groupName: "Temple visit plannings",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 4,
    //         groupName: "Temple visit planningss",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 5,
    //         groupName: "Single person updated",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 6,
    //         groupName: "Temple visit planningssss",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 7,
    //         groupName: "Temples",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 8,
    //         groupName: "Temples plan",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 9,
    //         groupName: "Temples plans",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 10,
    //         groupName: "Temples planings",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 11,
    //         groupName: "QuinbayIntern",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //       {
    //         userId: 1,
    //         groupId: 12,
    //         groupName: "group 12",
    //         totalToReceive: 4850.0,
    //         totalToPay: 0.0,
    //       },
    //     ],
    //   },
    };
  },
  computed: {
    ...mapState(useAppStore, [
      "categoryWiseReport",
      "groupWiseReport",
      "currentUserId",
    ]),
  },

  mounted() {
    this.GET_GROUP_REPORT(this.currentUserId, this.onSuccessGroup);
    this.GET_CATEGORY_REPORT(this.currentUserId, this.onSuccessCatagory);
  },
  methods: {
    onSuccessGroup() {
      this.initializeGroupChart();
    },
    onSuccessCatagory() {
      this.initializeCategoryChart();
    },
    ...mapActions(useAppStore, ["GET_GROUP_REPORT", "GET_CATEGORY_REPORT"]),
    initializeGroupChart() {
      if (this.groupWiseReport) {
        // this.$refs.groupChart.destroy();
        this.$refs.groupChart.style.height = "100%";
        this.$refs.groupChart.style.width = "100%";
        const ctx = this.$refs.groupChart.getContext("2d");
        const labels = this.groupWiseReport.groupSummaryList.map(
          (summary) => summary.groupName
        );
        const dataToPay = this.groupWiseReport.groupSummaryList.map(
          (summary) => summary.totalToPay
        );
        const dataToReceive = this.groupWiseReport.groupSummaryList.map(
          (summary) => summary.totalToReceive
        );

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Total to Pay",
                backgroundColor: "#E8413D",
                data: dataToPay,
              },
              {
                label: "Total to Receive",
                backgroundColor: "#507B58",
                data: dataToReceive,
              },
            ],
          },
        });
      }
    },
    initializeCategoryChart(){
      if (this.categoryWiseReport) {
        // this.$refs.categoryChart.destroy();
        this.$refs.categoryChart.style.height = "100%";
        this.$refs.categoryChart.style.width = "100%";
        const ctx1 = this.$refs.categoryChart.getContext("2d");
        const labels1 = this.categoryWiseReport.map(
          (category) => category.category
        );
        const dataToPay1 = this.categoryWiseReport.map(
          (category) => category.totalToPay
        );
        const dataToReceive1 = this.categoryWiseReport.map(
          (category) => category.totalToReceive
        );

        new Chart(ctx1, {
          type: "bar",
          data: {
            labels: labels1,
            datasets: [
              {
                label: "Total to Pay",
                backgroundColor: "#E8413D",
                data: dataToPay1,
              },
              {
                label: "Total to Receive",
                backgroundColor: "#507B58",
                data: dataToReceive1,
              },
            ],
          },
        });
      }
    },
  },
});
