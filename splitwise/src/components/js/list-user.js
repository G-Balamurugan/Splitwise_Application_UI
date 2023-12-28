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
  props: ['users'],
  methods: {
    searchByName() {

    },
    createExpense() {
      this.$router.push("/add-expense/");
    },
    getFirstLetter(text) {
      if(text)
        return text.charAt(0).toUpperCase();
    },
    navigateToUser(userId) {
      this.$router.push("/user/" + userId);
    },
    handleWindowResize() {
      this.isLargeScreen = window.innerWidth > 1250;
    },
    ...mapActions(useAppStore, ["GET_USER_GROUP_BY_NAME"]),
  },
  watch: {
    "$route.params.user_id"(newGroupId) {
      if (newGroupId) {
        this.selectedGroup = newGroupId;
      }
    },
  },
  computed: {
    // ...mapState(useAppStore, ["groups"]),

  },
  created() {
    this.selectedGroup = this.$route.params.user_id;
    window.addEventListener("resize", this.handleWindowResize);
    // this.GET_ALL_GROUP();
    console.log(this.groups)

  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
