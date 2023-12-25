const local = "http://localhost"  
const net = "http://10.30.1.178"

const url = local

  const login = (loginDetails) => {
    return fetch(url+":8081/httpmethod/login", {
      method: "POST",
      body: JSON.stringify(loginDetails),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };
  
  const getAllGroups = (userId) => {
    return fetch(url+":8081/httpmethod/group-list/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };

  const getAllExpenses = (groupId) => {
    return fetch(url+":8089/httpmethod/expense-list/" + groupId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };

  const getNotifications = (userId) => {
    return fetch(url+":8085/httpmethod/notify-list/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };
  
  const getAllExpensesByCategory = (groupId, category) => {
    // const url = `http://localhost:8089/httpmethod/filter-group-category?groupId=${groupId}&category=${category}`;  
    const url = `http://10.30.1.178:8089/httpmethod/filter-group-category?groupId=${groupId}&category=${category}`;  
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };
  
  const getAllUsers = () => {
    return fetch(url+":8081/httpmethod/user-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };

  const getGroupDetails = (groupId) => {
    return fetch(url+":8081/httpmethod/group-details/" + groupId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };

  const getGroupMembers = (groupId) => {
    return fetch(url+":8081/httpmethod/group-member/" + groupId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };

  const addExpense = (expenseDetails) => {
    return fetch(url+":8089/httpmethod/add/expense", {
      method: "POST",
      body: JSON.stringify(expenseDetails),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };

  const payExpense = (expenseId, userId) => {
    return fetch(url+":8089/httpmethod/payment/"+expenseId+"/"+userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };

  const addGroup = (groupDetails, id) => {
    return fetch(url+":8081/httpmethod/add/group/" + id, {
      method: "POST",
      body: JSON.stringify(groupDetails),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };
  
  const updateGroup = (groupDetails, id) => {
    return fetch(url+":8081/httpmethod/update/group/" + id, {
      method: "PUT",
      body: JSON.stringify(groupDetails),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };
  export default {
    login,
    getAllUsers,
    addGroup,
    getAllGroups,
    getAllExpenses,
    addExpense,
    getGroupMembers,
    payExpense,
    getAllExpensesByCategory,
    getNotifications,
    getGroupDetails,
    updateGroup,
  };
  