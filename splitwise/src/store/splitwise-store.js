import { defineStore } from 'pinia'
import services from "../service/services.js";

export const useAppStore = defineStore('app', {
  state: () => ({
    showNavBar: true,
    notificationCount: 0,
    groups: [],
    expenses: [],
    users: [],
    usernames: [],
    groupCreationStatus: "",
    loginStatus: "",
    notifications: [],
    showNotification: false,
  }),
  actions: {
    logoutUser() {
      this.loginStatus = ""
    },
    setNotificationTrue() {
      console.log("opening")
      this.showNotification = true;
    },
    setNotificationFalse() {
      this.showNotification = false;
    },
    toggleNotification() {
      this.showNotification = !this.showNotification
    },
    async LOGIN(loginDetails) {
      const payload = loginDetails.payload;

      try {
        const loginResponse = await services.login(payload);
        const data = await loginResponse.json();
        console.log(loginResponse);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('phoneNumber', loginDetails.payload.phoneNumber);
        if (data.status == "Login Successful" || data.status == "Already Logged In") {
          this.loginStatus = "success"
          loginDetails.success()
        } else {
          console.log("Invalid user credentials");
          this.loginStatus = "failed" 
        }
      } catch (error) {
        console.error("Error in LOGIN action:", error);
      }
    },
    async GET_ALL_USERS() {
      try {
        const userResponse = await services.getAllUsers();
        const data = await userResponse.json();
        console.log(userResponse);
        this.users = data;
        this.usernames = this.users.map(user => user.userName);
        console.log(this.usernames)
        if (userResponse.status == 200) {
          console.log("Fetched data: ", this.users); // data -> status pass/fails
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async GET_ALL_GROUP() {
      try {
        const groupResponse = await services.getAllGroups(localStorage.getItem("userId"));
        const data = await groupResponse.json();
        console.log(groupResponse);
        this.groups = data;
        if (groupResponse.status == 200) {
          console.log("Fetched data: ", this.groups); // data -> status pass/fails
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async GET_ALL_EXPENSES(groupId) {
      try {
        const expenseResponse = await services.getAllExpenses(groupId);
        const data = await expenseResponse.json();
        console.log(expenseResponse);
        this.expenses = data;
        if (expenseResponse.status == 200) {
          console.log("Fetched data: ", this.expenses); // data -> status pass/fails
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async GET_EXPENSES_BY_CATEGORY(groupId, category) {
      try {
        const expenseResponse = await services.getAllExpensesByCategory(groupId, category);
        const data = await expenseResponse.json();
        console.log(expenseResponse);
        this.expenses = data;
        if (expenseResponse.status == 200) {
          console.log("Fetched data: ", this.expenses); // data -> status pass/fails
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async GET_NOTIFICATION(userId) {
      try {
        const notificationResponse = await services.getNotifications(userId);
        const data = await notificationResponse.json();
        console.log(notificationResponse);
        this.notifications = data;
        this.notificationCount = this.notifications.length;
        if (notificationResponse.status == 200) {
          console.log("Fetched notification: ", this.notifications); // data -> status pass/fails
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async GET_GROUP_MEMBERS(groupId) {
      try {
        const memberResponse = await services.getGroupMembers(groupId);
        const data = await memberResponse.json();
        console.log(memberResponse);
        this.users = data;
        if (memberResponse.status == 200) {
          console.log("Fetched data: ", this.users); // data -> status pass/fails
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async ADD_EXPENSE({payload, success}){
      // const payload = expenseDetails.payload
      const createExpenseResponse = await services.addExpense(payload)
      const data = await createExpenseResponse.json();
      if(createExpenseResponse.status === 200){
        console.log("Fetched expense: ", data);
        success()
      }
      else
        console.log("Error fetching expense")
    },
    async ADD_GROUP({payload, success}){
      const createGroupResponse = await services.addGroup(payload, localStorage.getItem('userId'))
      const data = await createGroupResponse.json();
      if(createGroupResponse.status === 200){
        console.log("User logged in: ", data);
        this.groupCreationStatus = "success";
        success(data.id)
      }
      else{
        console.log("Invaild user credentials")
        this.groupCreationStatus = "failed";
      }
    },
    async PAY_EXPENSE(expenseId, userId, groupId){
      const payExpenseResponse = await services.payExpense(expenseId, userId)
      const data = await payExpenseResponse.json();
      if(payExpenseResponse.status === 200){
        console.log("Fetched expense: ", data);
        this.GET_ALL_EXPENSES(groupId);
      }
      else
        console.log("Error fetching expense")
    },
  }
})
