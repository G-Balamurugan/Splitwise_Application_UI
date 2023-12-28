<template>
  <div class="right-column">
    <v-row
      v-if="!userId"
      justify="center"
      style="align-items: center; height: calc(100vh - 200px)"
    >
      <h3>Select a user to view expenses</h3>
    </v-row>

    <v-row
      v-if="userId"
      style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 100px;
      "
    >
      <v-col cols="12" sm="6" md="4" style="margin-top: 20px">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Select a category"
          @change="searchByCategory"
        ></v-select>
      </v-col>
      <!-- <v-col cols="12" sm="6" md="4" style="margin-top: 20px">
        <v-text-field
          style=" color:black height: 50px;"
          v-model="search"
          label="Search"
          @keyup.enter="searchByCategory"
        ></v-text-field>
      </v-col> -->
      <v-col style="font-size: 24px"
        ><strong>{{ userDetail.userName }}</strong></v-col
      >
      <v-col>
        <v-icon @click="showUserInfo">mdi-information</v-icon>
        <UserInfo
          v-if="showInfo"
          :groupDetail="userDetails"
          @closeUserInfo="closeUserInfo"
        />
      </v-col>
      <!-- <v-col justify="end" style="text-align: end">
        <v-btn @click="createExpense">Create Expense</v-btn>
      </v-col> -->
    </v-row>

    <v-row
      v-if="userExpenses.length == 0 && userId"
      justify="center"
      style="align-items: center; height: calc(100vh - 200px)"
    >
      <!-- <img src="@/assets/notfound.gif"/> -->
      <h3>Initiate a fresh start by creating a new expense</h3>
    </v-row>
    <v-row v-if="userExpenses.length > 0 && userId" class="expense-container">
      <v-col
        v-for="(expense, index) in userExpenses"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card
          class="grp-card"
          style="box-shadow: 0 1px 3px rgba(0, 0, 0, 0.8)"
        >
          <v-col class="group-card">
            <v-card-title class="group-card-title">{{
              expense.note
            }}</v-card-title>
            <v-card-subtitle class="group-card-head-subtitle"
              >Total: ₹ {{ expense.amount.toFixed(2) }}</v-card-subtitle
            >
          </v-col>
          <v-col style="width: 100%; display: flex; padding-bottom: 0px">
            <v-card-subtitle class="group-card-subtitle"
              >Category: {{ expense.category }}
            </v-card-subtitle>
          </v-col>
          <v-col style="width: 100%; display: flex; padding-bottom: 0px">
            <v-card-subtitle class="group-card-subtitle">
              Created By: {{ getUserById(expense.createdBy) }}</v-card-subtitle
            >
          </v-col>

          <v-card-actions
            v-if="isUserAvailableInList(expense)"
            style="justify-content: end; width: 100%"
          >
            <v-btn
              @click="payExpense(expense.expenseId)"
              :disabled="hasUserPaid(expense)"
              :color="hasUserPaid(expense) ? 'green' : 'primary'"
            >
              <v-icon color="success" v-if="hasUserPaid(expense, index)"
                >mdi-check</v-icon
              >
              {{ hasUserPaid(expense) ? "Paid" : "Pay" }}
            </v-btn>
          </v-card-actions>
          <v-card-actions
            v-if="!isUserAvailableInList(expense)"
            style="justify-content: center; width: 100%"
            :color="hasUserPaid(expense) ? 'green' : 'primary'"
          >
            <p
              v-if="!hasUserPaid(expense) && !isUserAvailableInList(expense)"
              style="color: red;"
            >
              *Pending*
            </p>
            <p
              v-if="hasUserPaid(expense) && !isUserAvailableInList(expense)"
              style="color: green;"
            >
              *Received*
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./js/user-page.js"></script>

<style scoped>
.right-column {
  width: 70%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1250px) {
  .right-column {
    width: 100%;
  }
}

.v-row {
  flex: none;
}

.grp-card {
  border-radius: 0px 25px;
}
.group-card {
  background-color: #5c8374;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}
.group-card-title {
  width: 92%;
  display: flex;
  justify-content: start;
  height: 50px;
}

.group-card-head-subtitle {
  display: flex;
  justify-content: end;
  align-items: center;
}

.group-card-subtitle {
  display: flex;
  justify-content: start;
}

.expense-container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 200px);
  overflow-y: auto;
}

@media (max-width: 850px) {
  .expense-container {
    margin-top: 150px;
  }
}

.badge {
  margin: 0px 10px;
  border-radius: 10px;
  font-size: 10px;
  display: inline;
  color: #fff;
  padding: 5px;
}

.paid-badge {
  background-color: green;
}

.unpaid-badge {
  background-color: #ff3333;
}
</style>
