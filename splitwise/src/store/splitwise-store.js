import { defineStore } from "pinia";
import services from "../service/services.js";

export const useAppStore = defineStore("app", {
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
    categoryWiseReport: [],
    groupWiseReport: {},
    currentUserName: "",
    currentUserId: localStorage.getItem("userId"),
    currencies: ["USD", "EURO", "INR"],
    categories: ["Food", "Transportation", "Accommodation", "Others"],
    // groupDetails: {},
  }),
  actions: {
    setNotificationTrue() {
      this.showNotification = true;
    },
    setNotificationFalse() {
      this.showNotification = false;
    },
    toggleNotification() {
      this.showNotification = !this.showNotification;
    },
    async LOGIN(loginDetails) {
      const payload = loginDetails.payload;

      try {
        const loginResponse = await services.login(payload);
        const data = await loginResponse.json();
        localStorage.setItem("userId", data.id);
        localStorage.setItem("phoneNumber", loginDetails.payload.phoneNumber);
        localStorage.setItem("token", data.token);
        if (
          data.status == "Login Successful" ||
          data.status == "Already Logged In"
        ) {
          this.loginStatus = "success";
          loginDetails.success();
        } else {
          console.log("Invalid user credentials");
          this.loginStatus = "failed";
        }
      } catch (error) {
        console.error("Error in LOGIN action:", error);
      }
    },
    async LOGOUT(logoutDetails) {
      const payload = logoutDetails.payload;
      localStorage.clear();

      try {
        const logoutResponse = await services.logout(payload);
        const data = await logoutResponse.json();
        localStorage.clear();
        if (data.status == "Logout Successful") {
        } else {
          console.log("Logout Unsuccessful");
          this.loginStatus = "failed";
        }
      } catch (error) {
        console.error("Error in LOGOUT action:", error);
      }
    },
    async GET_ALL_USERS(success) {
      try {
        const userResponse = await services.getAllUsers();
        const data = await userResponse.json();
        const localStorageUserId = localStorage.getItem('userId');

        this.users = data;
        this.usernames = this.users.filter(user => user.userId != localStorageUserId);
        this.usernames = this.usernames.map((user) => user.userName);
        if (userResponse.status == 200) {
          success();
          const localStorageUserId = localStorage.getItem("userId");
          if (localStorageUserId) {
            const foundUser = this.users.find(
              (user) => user.userId == localStorageUserId
            );
            if (foundUser) {
              this.currentUserName = foundUser.userName;
            } else {
              console.log("User not found in the fetched data");
            }
          } else {
            console.log("userId not found in localStorage");
          }
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    updateUsers(userList) {
      this.users = userList
    },
    async GET_ALL_GROUP() {
      try {
        const groupResponse = await services.getAllGroups(
          localStorage.getItem("userId")
        );
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
    async GET_GROUP_BY_NAME() {
      try {
        const groupResponse = await services.getGroupByName(
          localStorage.getItem("userId")
        );
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
        const expenseResponse = await services.getAllExpensesByCategory(
          groupId,
          category
        );
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
    async GET_GROUP_REPORT(userID, success) {
      try {
        const groupReportResponse = await services.getGroupReport(userID);
        const data = await groupReportResponse.json();
        this.groupWiseReport = data;
        if (groupReportResponse.status == 200) {
          success();
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async GET_CATEGORY_REPORT(userID, success) {
      try {
        const categoryReportResponse = await services.getCategoryReport(userID);
        const data = await categoryReportResponse.json();
        this.categoryWiseReport = data;
        if (categoryReportResponse.status == 200) {
          success();
        } else {
          console.log("Error in fetch");
        }
      } catch (error) {
        console.error("Error in fetch:", error);
      }
    },
    async ADD_EXPENSE({ payload, success }) {
      const createExpenseResponse = await services.addExpense(payload);
      const data = await createExpenseResponse.json();
      if (createExpenseResponse.status === 200) {
        success();
      } else console.log("Error fetching expense");
    },
    async ADD_GROUP({ payload, success, failure }) {
      const createGroupResponse = await services.addGroup(
        payload,
        localStorage.getItem("userId")
      );
      const data = await createGroupResponse.json();
      if (createGroupResponse.status === 200 && data.id != 0) {
        this.groupCreationStatus = "success";
        success(data.id);
      } else {
        console.log("Invaild user credentials");
        this.groupCreationStatus = "failed";
        failure();
      }
    },
    async UPDATE_GROUP({ payload, success, failure }) {
      const updateGroupResponse = await services.updateGroup(
        payload,
        localStorage.getItem("userId")
      );
      const data = await updateGroupResponse.json();
      if (updateGroupResponse.status === 200 && data.id != 0) {
        this.groupCreationStatus = "success";
        success(data.id);
      } else {
        this.groupCreationStatus = "failed";
        failure();
      }
    },
    async PAY_EXPENSE(expenseId, userId, groupId) {
      const payExpenseResponse = await services.payExpense(expenseId, userId);
      const data = await payExpenseResponse.json();
      if (payExpenseResponse.status === 200) {
        this.GET_ALL_EXPENSES(groupId);
      } else console.log("Error fetching expense");
    },
    async READ_NOTIFICATION(notificationId) {
      const notificationResponse = await services.readNotification(
        notificationId
      );
      const data = await notificationResponse.json();
      if (notificationResponse.status === 200) {
        this.GET_NOTIFICATION(localStorage.getItem("userId"));
      } else console.log("Error fetching expense");
    },
  },
});
