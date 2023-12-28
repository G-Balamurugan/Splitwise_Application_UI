import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";
import UserInfo from "@/components/GroupInfo.vue";

export default {
  data() {
    return {
      search: "",
      showInfo: false,
      userDetail: {},
      userId: "",
      selectedCategory: null,
    //   userExpenses: [
    //     {
    //         "expenseId": "b99b3811-9d38-3c8a-1002-c656fcea7a3e",
    //         "note": "IV food",
    //         "category": "Food",
    //         "createdBy": 1,
    //         "amount": 5000.0,
    //         "currencyType": "INR",
    //         "receiverUser": 3,
    //         "payed": true
    //     },
    //     {
    //         "expenseId": "19eafbb8-88f4-02cb-c6d3-bbdf9ce65a1a",
    //         "note": "IV food",
    //         "category": "Food",
    //         "createdBy": 1,
    //         "amount": 832400.0,
    //         "currencyType": "USD",
    //         "receiverUser": 3,
    //         "payed": false
    //     },
    //     {
    //         "expenseId": "bb60ab86-59cf-fbbc-32a3-2157ae9a5d95",
    //         "note": "IV food",
    //         "category": "Food",
    //         "createdBy": 2,
    //         "amount": 832400.0,
    //         "currencyType": "USD",
    //         "receiverUser": 3,
    //         "payed": true
    //     }
    // ],
    };
  },
  components: {
    UserInfo,
  },
  methods: {
    showUserInfo() {
      this.showInfo = !this.showInfo;
    },
    closeUserInfo() {
      this.showInfo = false;
    },
    createExpense() {
      this.$router.push("/add-expense/" + this.userId);
    },
    payExpense(expenseId) {
      this.receiverId = this.$route.params.user_id
      const userId = localStorage.getItem("userId");
      this.PAY_EXPENSE_USER(expenseId, userId, this.receiverId);
    },

    hasUserPaid(expense) {
      return expense.payed
    },
    isUserAvailableInList(expense) {
      const loggedInUserId = localStorage.getItem("userId");
      return expense.createdBy != loggedInUserId

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
        this.GET_EXPENSES_BY_CATEGORY(this.userId, category);
      }
    },
    onSuccessUsers() {
    },
    successFetch(){
      this.userDetail = this.userDetails
    },
    ...mapActions(useAppStore, [
      "GET_EXPENSES_BY_USER",
      "PAY_EXPENSE_USER",
      "GET_USER_DETAILS",
      "GET_CATEGORY_LIST"
    ]),
  },
  computed: {
    ...mapState(useAppStore, ["userExpenses", "users", "userDetails", "categories"]),
  },
  watch: {
    selectedCategory(newValue) {
      this.searchByCategory(newValue)
    },
    '$route.params.user_id'(newUserId) {
      if (newUserId) {
        this.GET_EXPENSES_BY_USER(newUserId);
        // this.GET_ALL_USERS(this.onSuccessUsers);
        this.GET_USER_DETAILS(newUserId, this.successFetch);  
        this.GET_CATEGORY_LIST()
      }
    },
    $route(to, from) {
        this.closeUserInfo();
    },
    userDetails (newValue) {
      this.userDetail = newValue
    }
  },
  created() {
    this.userId = this.$route.params.user_id
    if (this.userId) {
      this.GET_EXPENSES_BY_USER(this.userId);
      // this.GET_ALL_USERS(this.onSuccessUsers);
      this.GET_USER_DETAILS(this.userId, this.successFetch);  
      this.GET_CATEGORY_LIST()  
    }
  },

};
