import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";
import GroupInfo from "@/components/GroupInfo.vue";

export default {
  data() {
    return {
      search: "",
      showInfo: false,
      groupDetail: {},
      groupId: "",
      selectedCategory: null,
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
      this.$router.push("/add-expense/" + this.groupId);
    },
    payExpense(expenseId) {
      const userId = localStorage.getItem("userId");
      this.PAY_EXPENSE(expenseId, userId, this.groupId);
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
    // searchByCategory() {  //search
    //   this.GET_EXPENSES_BY_CATEGORY(this.groupId, this.search);
    // },
    searchByCategory(category) {    //dropdown
      if (this.selectedCategory) {
        this.GET_EXPENSES_BY_CATEGORY(this.groupId, category);
      }
    },
    onSuccessUsers() {
    },
    successFetch(){
      this.groupDetail = this.groupDetails
    },
    ...mapActions(useAppStore, [
      "GET_ALL_EXPENSES",
      "PAY_EXPENSE",
      "GET_ALL_USERS",
      "GET_EXPENSES_BY_CATEGORY",
      "GET_GROUP_DETAILS",
      "GET_CATEGORY_LIST"
    ]),
  },
  computed: {
    ...mapState(useAppStore, ["expenses", "users", "groupDetails", "filterCategory"]),
  },
  watch: {
    selectedCategory(newValue) {
      this.searchByCategory(newValue)
    },
    '$route.params.group_id'(newGroupId) {
      if (newGroupId) {
        this.GET_ALL_EXPENSES(newGroupId);
        this.GET_ALL_USERS(0, this.onSuccessUsers);
        this.GET_GROUP_DETAILS(newGroupId, this.successFetch);  
        this.GET_CATEGORY_LIST()
      }
    },
    $route(to, from) {
        this.closeGroupInfo();
    },
    groupDetails (newValue) {
      this.groupDetail = newValue
    }
  },
  created() {
    this.groupId = this.$route.params.group_id
    if (this.groupId) {
      this.GET_ALL_EXPENSES(this.groupId);
      this.GET_ALL_USERS(0, this.onSuccessUsers);
      this.GET_GROUP_DETAILS(this.groupId, this.successFetch);  
      this.GET_CATEGORY_LIST()  
    }
  },

};
