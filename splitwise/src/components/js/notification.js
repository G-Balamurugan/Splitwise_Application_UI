import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";

export default {
    data() {
      return {

      };
    },
    methods: {
      formatCreatedDate(createdDate) {
        const date = new Date(createdDate);
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
          return date.toLocaleDateString();
        }
      },
      notificationClick(groupId) {
        console.log("group");
        this.$router.push("/group/" + groupId);
      },
      closeNotification() {
          this.$emit("closeNotification"); 
      },
    },
    computed: {
      ...mapState(useAppStore, ["notifications"]),
    },
    mounted() {
      document.body.addEventListener("click", this.closeNotificationOnClickOutside);
    },
    beforeDestroy() {
      document.body.removeEventListener("click", this.closeNotificationOnClickOutside);
    },
    computed: {
        ...mapState(useAppStore, ["notifications"]),
    },
  };
  