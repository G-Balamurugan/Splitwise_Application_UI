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
      console.log(tab, "tab")
      this.activeTab = tab;
    },
    handleWindowResize() {
      this.isLargeScreen = window.innerWidth > 1250;
    },
    onSuccessUsers() {
      // console.log(this.users)
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
      // Add the highlighted-tab class when the activeTab changes
      if (newTab === 'Group') {
        this.$nextTick(() => {
          const groupTab = this.$refs.groupTab;
          if (groupTab && groupTab.$el) {
            groupTab.$el.classList.add('highlighted-tab');
          }
          const userTab = this.$refs.userTab;
          if (userTab && userTab.$el) {
            userTab.$el.classList.remove('highlighted-tab');
          }
        });
      } else if (newTab === 'User') {
        this.$nextTick(() => {
          const userTab = this.$refs.userTab;
          if (userTab && userTab.$el) {
            userTab.$el.classList.add('highlighted-tab');
          }
          const groupTab = this.$refs.groupTab;
          if (groupTab && groupTab.$el) {
            groupTab.$el.classList.remove('highlighted-tab');
          }
        });
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
    console.log(this.users)
    console.log(this.activeTab)

  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
