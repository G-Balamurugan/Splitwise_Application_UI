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
      errorMessage: false,
      disabledUser: "",
    };
  },
  watch: {
    users: {
      handler(newList, oldList) {
        // if (oldList)
        //   this.disabledUsers = newList.find(
        //     (u) => u.userId == localStorage.getItem("userId")
        //   ).userName;
      },
      immediate: true,
    },
  },
  computed: {
    formIsValid() {
      return this.groupName && this.addedUsers.length >= 1;
    },
    isUpdate() {
      return this.$route.params.group_id != undefined;
    },

    ...mapState(useAppStore, [
      "users",
      "usernames",
      "groupCreationStatus",
      "groupDetails",
    ]),
  },
  methods: {
    removeUser(index) {
      this.addedUsers.splice(index, 1);
    },
    getUserNameByID(userId) {
      return this.users.find((u) => u.userId == userId).userName;
    },
    createOrUpdateGroup() {
      const memberPresent = this.addedUsers.map((username) => {
        const user = this.users.find((u) => u.userName === username);
        return { userId: user.userId };
      });
      memberPresent.push({userId: localStorage.getItem("userId")});

      const groupRequest = {
        groupName: this.groupName,
        memberPresent: memberPresent,
      };

      if (this.isUpdate) {
        groupRequest.groupId = this.$route.params.group_id;
      }

      const actions = {
        payload: groupRequest,
        success: this.onSuccess,
        failure: this.onFailure,
      };
      if (this.isUpdate) this.UPDATE_GROUP(actions);
      else this.ADD_GROUP(actions);
    },
    onSuccess(id) {
      this.$router.push("/group/" + id);
    },
    onFailure() {
      this.errorMessage = true;
    },
    successFetch() {
      this.groupName = this.groupDetails.groupName;
      this.addedUsers = this.groupDetails.memberPresent.map(
        (member) => member.userName
      );
    },
    onSuccessUsers() {
    },
    ...mapActions(useAppStore, [
      "GET_ALL_USERS",
      "ADD_GROUP",
      "UPDATE_GROUP",
      "GET_GROUP_DETAILS",
      "updateUsers",
    ]),
  },
  created() {
    this.GET_ALL_USERS(0, this.onSuccessUsers);
  },
  mounted() {
    if (this.isUpdate) {
      this.GET_GROUP_DETAILS(this.$route.params.group_id, this.successFetch);
    }
  },
};
