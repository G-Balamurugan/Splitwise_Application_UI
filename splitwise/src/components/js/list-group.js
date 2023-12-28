import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";
// import notfound from '@/assets/notfound.gif';

export default {
  data() {
    return {
      isLargeScreen: window.innerWidth >= 1250,
      selectedGroup: "",
      search: "",
    };
  },
  props: ["groups"],
  methods: {
    searchByName() {
      if (this.search != "") this.GET_GROUP_BY_NAME(this.search);
      else this.GET_ALL_GROUP();
    },
    searchByName() {
      if (this.search != "") this.GET_GROUP_BY_NAME(this.search);
      else this.GET_ALL_GROUP();
    },
    createGroup() {
      this.$router.push("/add-group");
    },

    editGroup(groupId) {
      this.$router.push("/update-group/" + groupId);
    },
    getFirstLetter(text) {
      if (text) return text.charAt(0).toUpperCase();
    },
    navigateToGroup(groupId) {
      this.$router.push("/group/" + groupId);
    },
    handleWindowResize() {
      this.isLargeScreen = window.innerWidth > 1250;
    },
    canEditGroup(group) {
      const localStorageUserId = localStorage.getItem("userId");
      return localStorageUserId == group.createdBy;
    },
    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    },
    ...mapActions(useAppStore, ["GET_ALL_GROUP", "GET_GROUP_BY_NAME"]),
  },
  watch: {
    "$route.params.group_id"(newGroupId) {
      if (newGroupId) {
        this.selectedGroup = newGroupId;
      }
    },
  },
  computed: {
    // ...mapState(useAppStore, ["groups"]),
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
    // this.GET_ALL_GROUP();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
