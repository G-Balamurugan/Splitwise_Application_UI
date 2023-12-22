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
    openNotifications() {},
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
    openNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    ...mapActions(useAppStore, ["logoutUser"]),
  },
  data() {
    return {
      showNotifications: false,
    };
  },
  computed: {
    ...mapState(useAppStore, [
      "notificationCount",
      "loginStatus",
      "GET_NOTIFICATION",
    ]),
    isLoginPage() {
      return this.$route.name != "login";
    },
  },
  created() {
    const userId = localStorage.getItem("userId");
    this.GET_NOTIFICATION(userId);
  }
};
