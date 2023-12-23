import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";

export default {
    data() {
      return {

      };
    },
    methods: {
      formatCreatedDate(createdDate) {
        const date = new Date(createdDate); //need change
        console.log(createdDate)
        return date.toLocaleString();
      },
      notificationClick(groupId) {
        console.log("group");
        this.$router.push("/group/" + groupId);
      },
    //   closeNotificationOnClickOutside(event) {
    //     const container = this.$refs.notificationContainer;
    //     if (container && !container.contains(event.target) && this.showNotification) {
    //         console.log("close")
    //       this.$emit("closeNotification"); 
    //     }
    //   },
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
  