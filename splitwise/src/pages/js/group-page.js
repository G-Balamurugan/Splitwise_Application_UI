import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
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
        return expense.userList.some((user) => user.userId.toString() === loggedInUserId);
      },
    getUserById(userId) {
        const user = this.users.find(u => u.userId === userId);
        return user ? user.userName : "Unknown User";
    },
    searchByCategory() {
        this.GET_EXPENSES_BY_CATEGORY(this.$route.params.group_id, this.search);
    },
    ...mapActions(useAppStore, ["GET_ALL_EXPENSES", "PAY_EXPENSE", "GET_ALL_USERS", "GET_EXPENSES_BY_CATEGORY"]),
  },
  computed: {
    ...mapState(useAppStore, ["expenses", "users"]),
  },
  created() {
    this.GET_ALL_EXPENSES(this.$route.params.group_id);
    this.GET_ALL_USERS();
  },
};
