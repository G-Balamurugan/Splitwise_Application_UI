import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      // groups: [
      //   {
      //     groupId: 1,
      //     groupName: "Tour",
      //     createdBy: 1,
      //     memberPresent: null,
      //   },
      //   {
      //     groupId: 2,
      //     groupName: "Plan",
      //     createdBy: 2,
      //     memberPresent: null,
      //   },
      // ],
    };
  },
  methods: {
    createGroup() {
      console.log("Creating a new group");
      this.$router.push("/add-group");
    },
    editGroup(group) {
      console.log("Editing group:", group);
      // this.$router.push("/edit-group");
    },
    getFirstLetter(text) {
      return text.charAt(0).toUpperCase();
    },
    navigateToGroup(groupId) {
      this.$router.push("/group/" + groupId);
    },
    ...mapActions(useAppStore, ["GET_ALL_GROUP"]),
  },
  computed: {
    ...mapState(useAppStore, ["groups"]),
  },
  created() {
    this.GET_ALL_GROUP();
  },
};
