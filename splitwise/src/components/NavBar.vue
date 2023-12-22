<template>
  <v-app>
    <v-app-bar app v-if="isLoginPage" color="primary">
      <v-img
        contain
        src="@/assets/logo.jpeg"
        max-height="40px"
        max-width="40px"
        class="logo"
      ></v-img>
      <v-btn to="/" text class="mr-4">
        <v-icon>mdi-home</v-icon>
        Home</v-btn
      >
      <v-btn to="/reports" text>
        <v-icon>mdi-chart-bar</v-icon>
        Reports</v-btn
      >

      <v-spacer></v-spacer>
      <v-btn icon @click="openNotifications" class="mr-4">
        <v-icon>mdi-bell</v-icon>
        <p v-if="notificationCount">
          {{ notificationCount }}
        </p>
      </v-btn>

      <v-btn @click="logout" to="/login" text>
        <v-icon>mdi-logout</v-icon>
        Logout</v-btn
      >
    </v-app-bar>

    <v-main class="content">
      <router-view></router-view>
      <Notification v-if="showNotifications" />
    </v-main>
  </v-app>
</template>

<script src="./js/nav-bar"></script>

<style scoped>
.logo {
  margin: 10px;
  border-radius: 10px;
  margin-right: 30px;
}

.content {
  width: 100%;
  background-color: #E0F4FF;  
}
</style>
