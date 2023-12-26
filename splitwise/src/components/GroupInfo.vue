<template>
  <v-container class="group-info-popup">
    <v-row>
      <v-col class="text-left">
        <h2>Group Details</h2>
        <p><strong>Group Name:</strong> {{ groupDetail.groupName }}</p>
        <h3>Members:</h3>

        <div v-if="groupDetail.memberPresent.length > 0">
          <div v-for="member in groupDetail.memberPresent" :key="member.id">
            <div>
              {{ member.userName }}
            </div>
            <!-- <div>{{ member.email }} | {{ member.address }}</div> -->
          </div>
        </div>

        <p v-else>No members in the group</p>
      </v-col>
      <div class="close-button">
        <i @click="closeGroupInfo" class="mdi mdi-close"></i>
      </div>
    </v-row>
  </v-container>
</template>

<script src="./js/group-info.js"></script>

<style scoped>
.group-info-popup {
  position: fixed;
  top: 125px;
  width: 300px;
  border-radius: 30px;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 850px) {
  .group-info-popup {
    right: 20px;
    top: 135px;
  }
}

.text-left {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.close-button {
  padding: 0px 20px;
  padding: 5px;
  cursor: pointer;
}
</style>
