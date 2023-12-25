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
    handleDocumentClick(event) {
      const notificationComponent = this.$refs.notificationComponent;
      const clickedInsideNotification = notificationComponent.$el.contains(
        event.target
      );
      if (!clickedInsideNotification) {
        this.closeNotifications();
      }
    },
    homePage() {
      this.$router.push("/");
    },
    logout() {
      this.showNavbar = false;
      this.loginStatus = "";
      this.logoutUser();
      console.log(this.loginStatus);
      this.closeNotifications();
      // this.setNotificationFalse();
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
      console.log(this.$route.params.group_id)
      return this.$route.name != "login";
    },
    isGroupPage() {
      return this.$route.name == "group-page" ;
    },
    isListPage() {
      console.log(this.$route.params.group_id)
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
