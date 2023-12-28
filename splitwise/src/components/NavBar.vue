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
      <v-btn to="/" text class="mr-4 nav-home">
        <v-icon size="32">mdi-home</v-icon>
        <p class="nav-text">Home</p>
      </v-btn>
      <v-btn to="/reports" text class="nav-home">
        <v-icon size="32">mdi-chart-bar</v-icon>
        <p class="nav-text">Reports</p></v-btn
      >

      <v-spacer></v-spacer>
      <p class="mr-6 user-name" style="font-size: 20px;">
          {{ c_user_name }}
      </p>
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
        <group-list-page v-if="isGroupOrUserPage && isLargeScreen"></group-list-page>
        <!-- <group-list v-if="isGroupPage && isLargeScreen"></group-list> -->
        <router-view></router-view>
      </div>
      <Notification
        v-if="showNotification"
        @closeNotification="closeNotifications"
        ref="notificationComponent"
      />
    </v-main>

    <v-bottom-navigation v-if="isMobileView" class="bottom-nav">
      <v-btn to="/" text style="width: 50%">
        <v-icon size="32">mdi-home</v-icon>
        <p class="nav-text">Home</p>
      </v-btn>
      <v-btn to="/reports" text style="width: 50%"> 
        <v-icon size="32">mdi-chart-bar</v-icon>
        <p class="nav-text">Reports</p>
      </v-btn>
    </v-bottom-navigation>
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

.bottom-nav {
  position: fixed;
  bottom: 0;
  background-color: #1B4242; 
  color: white; 
  display: none;
  justify-content: space-around !important;
  width: 100%;
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
  .bottom-nav {
    display: none;
  }
}

@media screen and (max-width: 775px) {
  /* .user-name{
    display: none;
  } */
  .nav-text {
    display: none;
  }
  .bottom-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around !important;
  }
  .nav-home{
    display: none;
  }
}
</style>
