import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";
import ListGroup from '../../components/ListGroup.vue'
import ListUser from '../../components/ListUser.vue'

export default {
  components: {
    ListGroup,
    ListUser,
  },
  data() {
    return {
      isLargeScreen: window.innerWidth >= 1250,
      selectedGroup: "",
      search: "",
      groupUser: {},
      activeTab: 'Group',
      // notfound: notfound,
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    handleWindowResize() {
      this.isLargeScreen = window.innerWidth > 1250;
    },
    onSuccessUsers() {
    },
    ...mapActions(useAppStore, ["GET_ALL_GROUP", "GET_GROUP_BY_NAME", "GET_ALL_USERS"]),
  },
  watch: {
    "$route.params.group_id"(newGroupId) {
      if (newGroupId) {
        this.selectedGroup = newGroupId;
      }
    },
    activeTab(newTab) {
      if (newTab === 'Group') {
        this.GET_ALL_GROUP();
      } else if (newTab === 'User') {
        const userId = localStorage.getItem("userId")
        this.GET_ALL_USERS(userId, this.onSuccessUsers);      
      }
    },
  },
  computed: {
    ...mapState(useAppStore, ["groups","users"]),
    isHomePath() {
      return this.$route.path === "/" && !this.isLargeScreen;
    },
    isOnlyHomePath() {
      return this.$route.path === "/";
    },
  },
  created() {
    this.selectedGroup = this.$route.params.group_id;
    window.addEventListener("resize", this.handleWindowResize);
    this.GET_ALL_GROUP();
    // this.GET_ALL_USERS(this.onSuccessUsers);

  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
