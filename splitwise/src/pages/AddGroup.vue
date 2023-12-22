<template>
  <v-container style="margin-top: 100px; width: 500px; height: 350px ;border-radius: 20px; background-color: #FFF;">
    <v-form style="max-width: 400px; margin: auto; margin-top: 50px;">
      <v-text-field
        v-model="groupName"
        label="Group Name"
        :rules="groupNameRules"
        style="color: #000; font-weight: bolder;"
      ></v-text-field>

      <v-autocomplete
        v-model="addedUsers"
        :items="usernames"
        label="Add Users"
        item-text="userName"
        :rules="addedUsersRules"
        multiple
        style="color: #000; font-weight: bolder;"
      ></v-autocomplete>

      <v-chip
        v-for="(user, index) in addedUsers"
        :key="index"
        close
        @click:close="removeUser(index)"
      >
        {{ user }}
      </v-chip>
      <v-row justify="center" style="margin-top: 30px">
        <v-btn @click="createGroup" :disabled="!formIsValid" color="primary"
          >Create Group</v-btn
        >
      </v-row>
    </v-form>
  </v-container>
</template>

<script src="./js/add-group"></script>
<style scoped></style>
