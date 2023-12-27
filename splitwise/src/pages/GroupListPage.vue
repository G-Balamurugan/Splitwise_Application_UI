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
      <v-card>
        <v-tabs v-model="activeTab">
          <v-tab
            :class="{ 'highlighted-tab': activeTab === 'Group' }"
            value="Group"
            style="width: 50%"
            >Group</v-tab
          >
          <v-tab
            :class="{ 'highlighted-tab': activeTab === 'User' }"
            value="User"
            style="width: 50%"
            >User</v-tab
          >
        </v-tabs>
      </v-card>

      <v-row class="group-header" v-if="activeTab == 'Group'">
        <list-group :groups="groups"></list-group>
      </v-row>

      <v-row class="group-header" v-if="activeTab == 'User'">
        <list-user :users="users"></list-user>
      </v-row>
    </div>
    <div v-if="isOnlyHomePath" class="select-grp">
      Select a group to view its expense
    </div>
  </div>
</template>

<script src="./js/group-list-page.js"></script>

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

.highlighted-tab {
  background-color: #9ec8b9;
  color: #fff;
}
</style>
