<template>
  <v-container
    style="
      margin-top: 100px;
      width: 500px;
      height: 350px;
      border-radius: 20px;
      background-color: #fff;
    "
  >
    <v-form style="max-width: 400px; margin: auto; margin-top: 50px">
      <h2
        style="
          text-align: center;
          color: #1b4242;
          font-weight: bold;
          margin-bottom: 20px;
        "
      >
        {{ isUpdate ? "Update Group" : "Create Group" }}
      </h2>

      <v-text-field
        v-model="groupName"
        label="Group Name"
        :rules="groupNameRules"
        style="color: #000; font-weight: bolder"
      ></v-text-field>

      <v-autocomplete
        v-model="addedUsers"
        :items="usernames"
        label="Add Users"
        item-text="userName"
        :rules="addedUsersRules"
        multiple
        style="color: #000; font-weight: bolder"
        :item-disabled="disabledUser"
      ></v-autocomplete>

      <v-chip
        v-for="(user, index) in addedUsers"
        :key="index"
        close
        @click:close="removeUser(index)"
      >
        {{ user }}
      </v-chip>
      <p v-if="errorMessage" class="error-message">*Group already exists*</p>
      <v-row justify="center" style="margin-top: 30px">
        <v-btn
          @click="createOrUpdateGroup"
          :disabled="!formIsValid"
          color="#1B4242"
          style="text-transform: capitalize; font-size: 16px;"
          >{{ isUpdate ? "Update Group" : "Create Group" }}</v-btn
        >
      </v-row>
    </v-form>
  </v-container>
</template>

<script src="./js/add-group"></script>
<style scoped>
.error-message {
  color: red;
  text-align: center;
  opacity: 1;
}
</style>
