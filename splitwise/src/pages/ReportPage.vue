<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="fromDate"
          label="From Date"
          type="date"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="toDate"
          label="To Date"
          type="date"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-alert :value="true">
          Total Amount Spent: {{ calculateTotal() }}
        </v-alert>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fromDate: null,
      toDate: null,
    };
  },
  methods: {
    calculateTotal() {},
  },
};
</script>
