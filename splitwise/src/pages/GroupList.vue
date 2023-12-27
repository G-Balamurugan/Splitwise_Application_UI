<template>
  <div
    :class="{ container: isOnlyHomePath, 'container-small': !isOnlyHomePath }"
  >
    <div
      :class="{
        'full-width': isHomePath,
        'left-column': isOnlyHomePath,
        'full-width-left': !isOnlyHomePath,
      }"
    >
    <v-row class="tab-header">
        <!-- <v-col>
          <v-tabs v-model="tab" background-color="#5c8374" light>
            <v-tab :to="{ name: 'groups' }">Groups</v-tab>
            <v-tab :to="{ name: 'users' }">Users</v-tab>
          </v-tabs>
        </v-col> -->
      </v-row>
      <v-row class="group-header" >
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

      <v-row>
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
          <!-- <img src="@/assets/notfound.gif"/> -->
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
    </div>
    <div v-if="isOnlyHomePath" class="select-grp">
      <!-- <img src="@/assets/notfound.gif"/> -->

      Select a group to view its expense
    </div>
  </div>
</template>

<script src="./js/group-list.js"></script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.container-small {
  width: 30%;
  display: flex;
  flex-direction: row;
}

.select-grp {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

@media (max-width: 1250px) {
  .select-grp {
    display: none;
  }
}

.left-column {
  width: 30%;
  padding: 20px;
  transition: width 0.5s ease;
}

.full-width-left {
  width: 100%;
  padding: 20px;
  transition: width 0.5s ease;
}

.full-width {
  width: 100%;
}

.group-row {
  height: calc(100vh - 150px);
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

.group-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.group-content {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #ffeed9;
  height: 65px;
}

.group-content-avatar {
  margin: 10px;
}

.selected-group {
  background-color: #9ec8b9;
}
</style>
