<template>
  <v-container>
    <v-scroller>
      <v-container
        style="
          /* margin-top: 50px; */
          padding: 50px;
          background-color: #fff;
          border-radius: 20px;
        "
      >
        <v-form style="margin-top: 30px">
          <v-row>
            <v-col col="12" xs="12" lg="12" sm="12" md="12" xl="12">
              <v-text-field
                v-model="note"
                label="Note"
                class="note-input"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12" lg="2" sm="6" md="3" xl="2" xs="12">
              <v-text-field
                v-model="totalAmount"
                label="Total Amount *"
                type="number"
                @input="handleTotalAmountInput"
                outlined
              ></v-text-field>
            </v-col>
            <v-col col="12" lg="3" sm="6" md="3" xl="3" xs="12">
              <v-select
                v-model="selectedCurrency"
                :items="currencies"
                label="Select Currency *"
                small-chips
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                col="12"
                lg="3"
                sm="6"
                md="3"
                xl="3"
                xs="12"
                v-model="selectedCategory"
                :items="categories"
                label="Select Category *"
              ></v-select>
            </v-col>
          </v-row>

          <div v-if="$route.params.group_id" justify="center" cols="12">
            <v-row v-for="(user, index) in users" :key="index" justify="center">
              <v-col cols="12" md="6" sm="6" xs="6">
                <v-checkbox
                  v-model="selectedUsers[index]"
                  :label="user.userName"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" md="6" sm="6" xs="6">
                <v-text-field
                  v-model="splitPercentages[index]"
                  label="Split %"
                  type="number"
                  @input="handleSplitPercentageInput(index)"
                  :disabled="shouldDisableSplitPercentage(index)"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-row v-if="!$route.params.group_id">
            <v-radio-group justify="center" v-model="selectedUserId">
              <v-radio
                v-for="(user, index) in users"
                :key="index"
                :label="user.userName"
                :value="user.userId"
                name="user-radio"
              ></v-radio>
            </v-radio-group>
          </v-row>
          <v-row justify="center">
            <v-btn
              @click="splitEqually"
              :disabled="!canSplitEqually"
              color="#1B4242"
              style="margin: 0px 30px"
              >Split Equally</v-btn
            >
            <v-btn
              @click="createExpense"
              :disabled="!isValidForm"
              color="#1B4242"
              >Create Expense</v-btn
            >
          </v-row>
        </v-form>
      </v-container>
    </v-scroller>
  </v-container>
</template>

<script src="./js/add-expense.js"></script>

<style scoped></style>
