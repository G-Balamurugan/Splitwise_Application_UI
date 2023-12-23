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
      console.log("open");
      this.toggleNotification();
    //   this.setNotificationTrue();
      console.log(this.showNotification)
    },
    closeNotifications() {
      console.log("close");
      this.setNotificationFalse();
    //   this.setNotificationFalse();
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
      localStorage.clear();
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
      //   showNotifications: false,
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
  },
  mounted() {
    const userId = localStorage.getItem("userId");
    this.GET_NOTIFICATION(userId);
  },
};
