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
    // groupDetails: {},
  }),
  actions: {
    logoutUser() {
      this.loginStatus = ""
    },
    setNotificationTrue() {
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
    async GET_ALL_USERS(success) {
      try {
        const userResponse = await services.getAllUsers();
        const data = await userResponse.json();
        
        this.users = data;
        this.usernames = this.users.map(user => user.userName);
        
        if (userResponse.status == 200) {
          success()
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
        this.groups = data;
        if (groupResponse.status == 200) {
          
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
        this.expenses = data;
        if (expenseResponse.status == 200) {
          
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
        this.expenses = data;
        if (expenseResponse.status == 200) {
          
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
        
        this.notifications = data;
        this.notificationCount = this.notifications.length;
        if (notificationResponse.status == 200) {
          
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async GET_GROUP_DETAILS(groupId, success) {
      try {
        const groupResponse = await services.getGroupDetails(groupId);
        const data = await groupResponse.json();
        this.groupDetails = data;
        if (groupResponse.status == 200) {
          this.groupDetails = data;
          success(); 
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
        this.users = data;
        if (memberResponse.status == 200) {
          
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async ADD_EXPENSE({payload, success}){
      const createExpenseResponse = await services.addExpense(payload)
      const data = await createExpenseResponse.json();
      if(createExpenseResponse.status === 200){  
        success()
      }
      else
        console.log("Error fetching expense")
    },
    async ADD_GROUP({payload, success, failure}){
      const createGroupResponse = await services.addGroup(payload, localStorage.getItem('userId'))
      const data = await createGroupResponse.json();
      if(createGroupResponse.status === 200 && data.id != 0 ){
        
        this.groupCreationStatus = "success";
        success(data.id)
      }
      else{
        console.log("Invaild user credentials")
        this.groupCreationStatus = "failed";
        failure()
      }
    },
    async UPDATE_GROUP({payload, success, failure}){
      const updateGroupResponse = await services.updateGroup(payload, localStorage.getItem('userId'))
      const data = await updateGroupResponse.json();
      if(updateGroupResponse.status === 200 && data.id != 0 ){
        
        this.groupCreationStatus = "success";
        success(data.id)
      }
      else{
        
        this.groupCreationStatus = "failed";
        failure()
      }
    },
    async PAY_EXPENSE(expenseId, userId, groupId){
      const payExpenseResponse = await services.payExpense(expenseId, userId)
      const data = await payExpenseResponse.json();
      if(payExpenseResponse.status === 200){
        c
        this.GET_ALL_EXPENSES(groupId);
      }
      else
        console.log("Error fetching expense")
    },
  }
})
