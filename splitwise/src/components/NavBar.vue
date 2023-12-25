<template>
  <v-app>
    <v-app-bar app v-if="isLoginPage" color="#1B4242">
      <v-img
        contain
        src="@/assets/logo.jpeg"
        max-height="40px"
        max-width="40px"
        class="logo"
      ></v-img>
      <v-btn to="/" text class="mr-4">
        <v-icon size="32">mdi-home</v-icon>
        <p class="nav-text">Home</p>
      </v-btn>
      <v-btn to="/reports" text>
        <v-icon size="32">mdi-chart-bar</v-icon>
        <p class="nav-text">Reports</p></v-btn
      >

      <v-spacer></v-spacer>
      <v-btn icon @click="openNotifications" class="mr-4">
        <v-icon size="32">mdi-bell</v-icon>
        <p v-if="notificationCount">
          {{ notificationCount }}
        </p>
      </v-btn>

      <v-btn @click="logout" to="/login" text>
        <v-icon size="32">mdi-logout</v-icon>
        <p class="nav-text">Logout</p></v-btn
      >
    </v-app-bar>

    <v-main class="content">
      <div class="container">
        <group-list v-if="isGroupPage && isLargeScreen"></group-list>
        <!-- <group-list v-if="isGroupPage && isLargeScreen"></group-list> -->
        <router-view></router-view>
      </div>
      <Notification
        v-if="showNotification"
        @closeNotification="closeNotifications"
        ref="notificationComponent"
      />
    </v-main>
  </v-app>
</template>

<script src="./js/nav-bar"></script>

<style scoped>
* {
  position: relative;
  background-size: cover;
  background-position: center;
  font-family: "Arial", sans-serif;
}

.logo {
  margin: 10px;
  border-radius: 10px;
  margin-right: 30px;
}

.container {
  margin-top: 10px;
  display: flex;
  height: 100%;
}

.content {
  width: 100%;
}

.nav-text {
  font-size: 18px;
  text-transform: none;
}

@media screen and (max-width: 560px) {
  .nav-text {
    display: none;
  }
}
</style>
