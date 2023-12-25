import { createRouter, createWebHistory } from 'vue-router'
import groupList from "../pages/GroupList.vue";
import addGroup from '../pages/AddGroup.vue';
import addExpense from '../pages/AddExpense.vue';
import groupPage from '../pages/GroupPage.vue';
import login from '../pages/Login.vue';
import reportPage from '../pages/ReportPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "group-list",
      component: groupList,
      meta: { requiresAuth: true },
    },
    {
      path: "/add-group",
      name: "add-group",
      component: addGroup,
      meta: { requiresAuth: true },
    },
    {
      path: "/update-group/:group_id",
      name: "update-group",
      component: addGroup,
      meta: { requiresAuth: true },
    },
    {
      path: "/add-expense/:group_id",
      name: "add-expense",
      component: addExpense,
      meta: { requiresAuth: true },
    },
    {
      path: "/group/:group_id?",
      name: "group-page",
      component: groupPage,
      meta: { requiresAuth: true },
    },
    // {
    //   path: "/group/",
    //   name: "group-page",
    //   component: groupPage,
    //   meta: { requiresAuth: true },
    // },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/reports",
      name: "report-page",
      component: reportPage,
      meta: { requiresAuth: true },
    }
  ]
})
router.beforeEach((to, from, next) => {
  const userId = localStorage.getItem('userId');

  if (to.meta.requiresAuth && (!userId || userId <= 0)) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
