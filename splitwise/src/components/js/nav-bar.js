import GroupList from "@/pages/GroupList.vue";
import { useAppStore } from "../../store/splitwise-store";
import { mapActions, mapState } from "pinia";
import Notification from "@/components/Notification.vue";

export default {
  components: {
    GroupList,
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
      this.logoutUser();
      this.closeNotifications();
      localStorage.clear();
    },

    handleWindowResize() {
      this.isLargeScreen = window.innerWidth > 1250;
    },
    ...mapActions(useAppStore, [
      "logoutUser",
      "GET_NOTIFICATION",
      "setNotificationTrue",
      "setNotificationFalse",
      "toggleNotification",
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
    ]),
    isLoginPage() {
      return this.$route.name != "login";
    },
    isGroupPage() {
      return this.$route.name == "group-page" ;
    },
    isListPage() {
      return !this.$route.params.group_id
    }
  },
  mounted() {
    const userId = localStorage.getItem("userId");
    this.GET_NOTIFICATION(userId);
  },
  created() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
