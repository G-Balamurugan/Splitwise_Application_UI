<template>
  <div>
    <v-row style="margin: 20px">
      <v-col>
        <h2>Groups</h2>
      </v-col>
      <v-col style="text-align: end">
        <v-btn @click="createGroup">Create Group</v-btn>
      </v-col>
    </v-row>
    <v-row style="margin: 10px">
      <v-col
        v-for="group in groups"
        :key="group.groupId"
        cols="12"
        xs="6"
        sm="4"
        md="3"
        lg="2"
      >
        <v-card class="group-card">
          <v-row @click="navigateToGroup(group.groupId)">
            <v-col class="text-center" style="height: 180px">
              <v-avatar
                size="150"
                style="background-color: #87C4FF; margin: 10px"
              >
                <h1 style="font-size: 80px; color: #fff">
                  {{ getFirstLetter(group.groupName) }}
                </h1>
              </v-avatar>
            </v-col>
          </v-row>
          <v-row style="background-color: #FFEED9; height: 65px">
            <v-col class="text-center" style="width: 100%">
              <span
                style="width: 50%; font-size: 18px; justify-content: start"
                @click="navigateToGroup(group.groupId)"
                >{{ group.groupName }}</span
              >
              <!-- <v-icon
                style="width: 50%; justify-content: end"
                @click="editGroup(group)"
                >mdi-pencil</v-icon
              > -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./js/group-list.js"></script>
<style scoped>
.group-card {
  transition: background-color 0.5s ease;
  cursor: pointer;
}

.group-card:hover {
  background-color: #edebeb;
}
</style>
