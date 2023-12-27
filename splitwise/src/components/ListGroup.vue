<template>
  <v-row style="display: flex; flex-direction: column; margin-top: 10px; padding: 20px;">
    <v-row class="group-header">
        <v-col>
          <v-text-field
            style=" color:black height: 50px;"
            v-model="search"
            label="Group"
            @keyup.enter="searchByName"
          ></v-text-field>
          <!-- <h2>Groups</h2> -->
        </v-col>
        <v-col style="text-align: end; margin-bottom: 20px">
          <v-btn @click="createGroup">Create Group</v-btn>
        </v-col>
      </v-row>
    <v-row class="group-row" v-if="!groups.length">
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: center;
          height: 100%;
          align-items: center;
        "
      >
        <p>No groups found</p>
      </div>
    </v-row>
    <v-row class="group-row" v-if="groups.length">
      <v-col
        v-for="group in groups"
        :key="group.groupId"
        class="group-list"
        cols="12"
      >
        <v-card class="group-card">
          <v-row
            :class="{ 'selected-group': group.groupId == selectedGroup }"
            align="center"
            style="
              height: 70px;
              padding: 0px 10px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            <div style="width: 70%" @click="navigateToGroup(group.groupId)">
              <v-avatar
                size="40"
                style="margin-left: 10px; background-color: #5c8374"
                class="group-content-avatar"
              >
                <h1 style="font-size: 26px; color: #fff">
                  {{ getFirstLetter(group.groupName) }}
                </h1>
              </v-avatar>

              <span style="font-size: 18px">
                {{ group.groupName }}
              </span>
            </div>
            <v-icon
              style="
                width: 30%;
                padding: 0px 25px;
                display: flex;
                flex-direction: column;
                justify-content: end;
                align-items: end;
              "
              v-if="canEditGroup(group)"
              @click="editGroup(group.groupId)"
            >
              mdi-pencil
            </v-icon>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>
<script src="./js/list-group.js"></script>

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

.group-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

</style>
