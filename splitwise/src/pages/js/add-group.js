import { mapActions, mapState, mapWritableState } from "pinia";
import { useAppStore } from "../../store/splitwise-store";

export default {
  data() {
    return {
      groupName: "",
      selectedUser: null,
      // users: ["Vignesh", "Bala", "Sangavi"],
      addedUsers: [],
      groupNameRules: [(v) => !!v || "Group name is required"],
      addedUsersRules: [
        (v) => (v && v.length > 0) || "Please add at least one user",
      ],
    };
  },
  computed: {
    formIsValid() {
      return this.groupName && this.addedUsers.length;
    },
    ...mapState(useAppStore, ["users", "usernames", "groupCreationStatus"]),
  },
  methods: {
    removeUser(index) {
      this.addedUsers.splice(index, 1);
    },
    createGroup() {
      console.log("Group Name:", this.groupName);
      console.log("Selected Users:", this.addedUsers);
      const memberPresent = this.addedUsers.map((username) => {
        const user = this.users.find((u) => u.userName === username);
        return { userId: user.userId };
      });

      if (this.groupName && this.addedUsers) {
        const groupRequest = {
          "groupName": this.groupName,
          "memberPresent": memberPresent,
        };
        console.log(groupRequest)
        const actions = {
          payload: groupRequest,
          success: this.onSuccess,
        };
        this.ADD_GROUP(actions);
      } else {
        console.log("Form is invalid. Cannot submit.");
      }
    },
    onSuccess(id) {
      console.log(id, ":id")
      this.$router.push("/group/"+id)
    },
    ...mapActions(useAppStore, ["GET_ALL_USERS", "ADD_GROUP"]),
  },
  created() {
    this.GET_ALL_USERS();
  },
};
