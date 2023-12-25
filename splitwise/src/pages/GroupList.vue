<template>
  <div class="left-column" :class="{ 'full-width': isHomePath}">
    <v-row class="group-header">
      <v-col>
        <h2>Groups</h2>
      </v-col>
      <v-col style="text-align: end">
        <v-btn @click="createGroup">Create Group</v-btn>
      </v-col>
    </v-row>

    <v-row class="group-row">
      <v-col
        v-for="group in groups"
        :key="group.groupId"
        class="group-list"
        :class="{ 'selected-group': group.groupId === $route.params.group_id }"
        cols="12"
      >
        <v-card class="group-card">
          <v-row
            align="center"
            style="
              width: 100%;
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
                display: flex;
                flex-direction: column;
                justify-content: end;
                align-items: end;
              "
              @click="editGroup(group.groupId)"
            >
              mdi-pencil
            </v-icon>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./js/group-list.js"></script>

<style scoped>
.left-column {
  width: 25%;
  padding: 20px;
  transition: width 0.5s ease;
}

.full-width {
  width: 100%;
}

.group-row {
  height: calc(100vh - 150px);
  overflow-y: auto;
}

.group-list {
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  background-color: red; /* Add your selected group background color here */
}
</style>
