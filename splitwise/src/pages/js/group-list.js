import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      isLargeScreen: window.innerWidth >= 1250,
      selectedGroup: "",
    };
  },
  methods: {
    createGroup() {
      this.$router.push("/add-group");
    },
    editGroup(groupId) {
      this.$router.push("/update-group/" + groupId);
    },
    getFirstLetter(text) {
      return text.charAt(0).toUpperCase();
    },
    navigateToGroup(groupId) {
      this.$router.push("/group/" + groupId);
    },
    handleWindowResize() {
      this.isLargeScreen = window.innerWidth > 1250;
    },
    ...mapActions(useAppStore, ["GET_ALL_GROUP"]),
  },
  watch: {
    "$route.params.group_id"(newGroupId) {
      if (newGroupId) {
        this.selectedGroup = newGroupId;
      }
    },
  },
  computed: {
    ...mapState(useAppStore, ["groups"]),
    isHomePath() {
      return this.$route.path === "/" && !this.isLargeScreen;
    },
  },
  created() {
    this.selectedGroup = this.$route.params.group_id;
    window.addEventListener("resize", this.handleWindowResize);
    this.GET_ALL_GROUP();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
