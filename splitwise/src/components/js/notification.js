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
        return date.toLocaleString();
      },
      notificationClick(groupId) {
        console.log("group");
        this.$router.push("/group/" + groupId);
      },
    },
    computed: {
        ...mapState(useAppStore, ["notifications"]),
    },
  };
  