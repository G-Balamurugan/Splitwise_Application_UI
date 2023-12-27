import GroupListPage from "@/pages/GroupListPage.vue";
import { useAppStore } from "../../store/splitwise-store";
import { mapActions, mapState } from "pinia";
import Notification from "@/components/Notification.vue";

export default {
  components: {
    GroupListPage,
    Notification,
  },
  methods: {
    openNotifications() {
      this.toggleNotification();
    },
    closeNotifications() {
      this.setNotificationFalse();
    },
    homePage() {
      this.$router.push("/");
    },
    logout() {
      this.showNavbar = false;
      this.loginStatus = "";
      this.logout();
      this.closeNotifications();
      localStorage.clear();
    },
    logout() {
      const loginRequest = {
        userId: localStorage.getItem("userId"),
      };
      const actions = {
        payload: loginRequest,
      };
      this.LOGOUT(actions);
    },
    handleWindowResize() {
      this.isLargeScreen = window.innerWidth > 1250;
    },
    onSuccessUsers() {},
    isMobileView() {
      return window.innerWidth > 560;
    },
    ...mapActions(useAppStore, [
      "LOGOUT",
      "GET_NOTIFICATION",
      "setNotificationTrue",
      "setNotificationFalse",
      "toggleNotification",
      "GET_ALL_USERS",
    ]),
  },
  watch: {
    $route(to, from) {
      this.closeNotifications();
    },
  },
  data() {
    return {
      isLargeScreen: window.innerWidth >= 1250,
    };
  },
  computed: {
    ...mapState(useAppStore, [
      "notificationCount",
      "loginStatus",
      "showNotification",
      "currentUserName",
    ]),
    isLoginPage() {
      return this.$route.name != "login";
    },
    isGroupPage() {
      return this.$route.name == "group-page";
    },
    isUserPage() {
      return this.$route.name == "user-page";
    },
    isListPage() {
      return !this.$route.params.group_id;
    },
  },
  mounted() {
    const userId = localStorage.getItem("userId");
    this.GET_NOTIFICATION(userId);
  },
  created() {
    this.GET_ALL_USERS(this.onSuccessUsers);
    window.addEventListener("resize", this.handleWindowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
