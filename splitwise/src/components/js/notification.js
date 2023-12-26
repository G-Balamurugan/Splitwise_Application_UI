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
        // const today = new Date();
        // if (date.toDateString() === today.toDateString()) {
        //   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // } else {
          // return date.toLocaleDateString();
        // }
        return date.toLocaleDateString();
      },
      notificationClick(groupId, notificationId) {
        this.READ_NOTIFICATION(notificationId);
        this.$router.push("/group/" + groupId);
      },
      closeNotification() {
          this.$emit("closeNotification"); 
      },
      ...mapActions(useAppStore, ["READ_NOTIFICATION"]),

    },
    computed: {
      ...mapState(useAppStore, ["notifications"]),
    },
    mounted() {
      console.log(this.notifications)
      document.body.addEventListener("click", this.closeNotificationOnClickOutside);
    },
  };
  