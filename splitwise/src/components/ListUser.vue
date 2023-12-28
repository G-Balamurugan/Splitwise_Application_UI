<template>
  <v-row style="display: flex; flex-direction: column; margin-top: 10px; padding: 20px;">
    <v-row class="group-header">
        <v-col>
          <v-text-field
            style=" color:black height: 50px;"
            v-model="search"
            label="User"
            @keyup.enter="searchByName"
          ></v-text-field>
          <!-- <h2>Groups</h2> -->
        </v-col>
        <v-col style="text-align: end; padding-top: 20px">
          <v-btn @click="createExpense">Create Expense</v-btn>
        </v-col>
      </v-row>
    
    <v-row class="group-row" v-if="!users.length">
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: center;
          height: 100%;
          align-items: center;
        "
      >
        <p>No users found</p>
      </div>
    </v-row>
    <v-row class="group-row" v-if="users.length">
      <v-col
        v-for="user in users"
        :key="user.userId"
        class="group-list"
        cols="12"
      >
        <v-card class="group-card">
          <v-row
            :class="{ 'selected-group': user.userId == selectedGroup }"
            align="center"
            style="
              height: 70px;
              padding: 0px 10px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            <div style="width: 70%" @click="navigateToUser(user.userId)">
              <v-avatar
                size="40"
                style="margin-left: 10px; background-color: #5c8374"
                class="group-content-avatar"
              >
                <h1 style="font-size: 26px; color: #fff">
                  {{ getFirstLetter(user.userName) }}
                </h1>
              </v-avatar>

              <span style="font-size: 18px">
                {{ user.userName }}
              </span>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>
<script src="./js/list-user.js"></script>

<style scoped>
.group-row {
  height: calc(100vh - 200px);
  overflow-y: auto;
  display: block;
}

.group-list {
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
}
.group-card {
  transition: background-color 0.5s ease;
  border-radius: 15px;
  cursor: pointer;
}

.group-card:hover {
  background-color: #edebeb;
}

.group-content-avatar {
  margin: 10px;
}

.selected-group {
  background-color: #9ec8b9;
}
</style>
