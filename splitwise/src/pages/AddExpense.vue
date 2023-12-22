<template>
  <v-container
    style="
      margin-top: 50px;
      padding: 50px;
      background-color: #fff;
      border-radius: 20px;
    "
  >
    <v-form style="margin-top: 30px">
      <v-row>
        <v-col cols="7">
          <v-text-field
            v-model="note"
            label="Note"
            class="note-input"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="totalAmount"
            label="Total Amount *"
            type="number"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="selectedCurrency"
            :items="currencies"
            label="Select Currency *"
            small-chips
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Select Category *"
          ></v-select>
        </v-col>
      </v-row>

      <v-row v-for="(user, index) in users" :key="index" justify="center">
        <v-col cols="3">
          <v-checkbox
            v-model="selectedUsers[index]"
            :label="user.userName"
          ></v-checkbox>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="splitPercentages[index]"
            label="Split %"
            :disabled="shouldDisableSplitPercentage(index)"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn
          @click="splitEqually"
          :disabled="!canSplitEqually"
          color="primary"
          style="margin: 0px 30px;"
          >Split Equally</v-btn
        >
        <v-btn @click="createExpense" :disabled="!isValidForm" color="primary"
          >Create Expense</v-btn
        >

      </v-row>
    </v-form>
  </v-container>
</template>

<script src="./js/add-expense.js"></script>

<style scoped></style>
