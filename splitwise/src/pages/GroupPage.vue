<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="search" label="Search" @keyup.enter="searchByCategory" outlined></v-text-field>
      </v-col>
      <v-col justify="end" style="margin: 20px; text-align: end">
        <v-btn @click="createExpense">Create Expense</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="expenses.length == 0" justify="center">
      <h3>Initiate a fresh start by creating a new expense</h3>
    </v-row>
    <v-row v-if="expenses.length > 0">
      <v-col
        v-for="(expense, index) in expenses"
        :key="index"
        cols="12"
        sm="12"
        md="9"
        lg="4"
        xl="6"
      >
        <v-card>
          <v-col class="group-card">
            <v-card-title class="group-card-title">{{
              expense.note
            }}</v-card-title>
            <v-card-subtitle class="group-card-head-subtitle"
              >₹ {{ expense.totalAmount }}</v-card-subtitle
            >
          </v-col>
          <v-col style="width: 100%; display: flex; padding-bottom: 0px">
            <v-card-subtitle class="group-card-subtitle"
              >Category: {{ expense.category }}
            </v-card-subtitle>
            <v-card-subtitle class="group-card-head-subtitle">
              Created By: {{ expense.createdBy }}</v-card-subtitle
            >
          </v-col>

          <v-list style="height: 130px">
            <v-list-item-group>
              <v-list-item
                v-for="(user, userIndex) in expense.userList"
                :key="userIndex"
              >
                <v-list-item-content
                  style="display: flex; width: 100%; padding: 0px 10px"
                >
                  <v-list-item-title
                    style="display: flex; justify-content: start; width: 50%"
                    >{{ getUserById(user.userId) }}
                  </v-list-item-title>
                  <v-list-item-title
                    style="display: flex; justify-content: end; width: 50%"
                  >
                    ₹ {{ user.splitAmount }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    v-if="user.payed"
                    style="
                      margin: 0px 10px;
                      background-color: green;
                      display: inline;
                      color: #fff;
                      padding: 2px;
                    "
                    >Paid</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    v-else
                    style="
                      margin: 0px 10px;
                      background-color: red;
                      display: inline;
                      color: #fff;
                      padding: 2px;
                    "
                    >Not Paid</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-card-subtitle style="display: flex; justify-content: end">
            {{ expense.userList.filter((user) => user.payed).length }}/{{
              expense.userList.length
            }}
            Users Paid
          </v-card-subtitle>

          <v-card-actions style="justify-content: end; width: 100%">
            <v-btn
              @click="payExpense(expense.expenseId)"
              :disabled="hasUserPaid(expense)"
              :color="hasUserPaid(expense) ? 'green' : 'primary'"
            >
            <v-icon color="success" v-if="hasUserPaid(expense)">mdi-check</v-icon>
            {{ hasUserPaid(expense) ? "Paid" : "Pay" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./js/group-page.js"></script>

<style scoped>
.group-card {
  background-color: #528bd0;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
}
.group-card-title {
  width: 50%;
  display: flex;
  justify-content: start;
  height: 50px;
}

.group-card-head-subtitle {
  width: 50%;
  display: flex;
  justify-content: end;
  align-items: center;
}

.group-card-subtitle {
  width: 50%;
  display: flex;
  justify-content: start;
}
</style>
