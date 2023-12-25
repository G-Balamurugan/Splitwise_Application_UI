import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";
import GroupInfo from "@/components/GroupInfo.vue";

export default {
  data() {
    return {
      search: "",
      showInfo: false,
      groupDetail: {},
    };
  },
  components: {
    GroupInfo,
  },
  methods: {
    showGroupInfo() {
      this.showInfo = !this.showInfo;
    },
    closeGroupInfo() {
      this.showInfo = false;
    },
    createExpense() {
      this.$router.push("/add-expense/" + this.$route.params.group_id);
    },
    payExpense(expenseId) {
      const userId = localStorage.getItem("userId");
      this.PAY_EXPENSE(expenseId, userId, this.$route.params.group_id);
    },

    hasUserPaid(expense) {
      const loggedInUserId = localStorage.getItem("userId");
      for (let i = 0; i < expense.userList.length; i++) {
        const user = expense.userList[i];
        if (user.userId == loggedInUserId && user.payed) return true;
      }
      return false;
    },
    isUserAvailableInList(expense) {
      const loggedInUserId = localStorage.getItem("userId");
      return expense.userList.some(
        (user) => user.userId.toString() === loggedInUserId
      );
    },
    getUserById(userId) {
      const user = this.users.find((u) => u.userId === userId);
      return user ? user.userName : "Unknown User";
    },
    searchByCategory() {
      this.GET_EXPENSES_BY_CATEGORY(this.$route.params.group_id, this.search);
    },
    onSuccessUsers() {
    },
    successFetch(){
      this.groupDetail = this.groupDetails
      console.log(this.groupDetails)
    },
    ...mapActions(useAppStore, [
      "GET_ALL_EXPENSES",
      "PAY_EXPENSE",
      "GET_ALL_USERS",
      "GET_EXPENSES_BY_CATEGORY",
      "GET_GROUP_DETAILS",
    ]),
  },
  computed: {
    ...mapState(useAppStore, ["expenses", "users", "groupDetails"]),
  },
  watch: {
    '$route.params.group_id'(newGroupId) {
      if (newGroupId) {
        this.GET_ALL_EXPENSES(newGroupId);
        this.GET_ALL_USERS(this.onSuccessUsers);
      }
    },
    $route(to, from) {
        this.closeGroupInfo();
    },
  },
  created() {
    if (this.$route.params.group_id) {
      this.GET_ALL_EXPENSES(this.$route.params.group_id);
      this.GET_ALL_USERS(this.onSuccessUsers);
      this.GET_GROUP_DETAILS(this.$route.params.group_id, this.successFetch);  
    }
    else
      console.log(this.$route.params.group_id == "")
  },

};
