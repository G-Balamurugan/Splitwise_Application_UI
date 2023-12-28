import { useAppStore } from "../../store/splitwise-store";
import { mapState, mapActions } from "pinia";

export default {
    data() {
      return {
        phoneNumber: "",
        password: "",
        phoneNumberRules: [
          (v) => !!v || "Phone number is required",
          (v) => (v && v.length == 10) || "Phone number must be 10 digits",
        ],
        passwordRules: [
          (v) => !!v || "Password is required",
          (v) => (v && v.length >= 4) || "Password must be at least 4 characters",
        ],
      };
    },
    watch: {
      loginStatus(newValue) {
        if (newValue === "success") {
          this.$router.push("/")
        }
      }
    },
    methods: {
      login() {
          if(this.phoneNumber.length == 10 && this.password.length >= 4 ){
            const loginRequest = {
              phoneNumber: this.phoneNumber,
              userPassword: this.password,
            };
            const actions = {
              payload: loginRequest,
              success: this.onSuccessOfLogin
            };
            this.LOGIN(actions);
          } else {
          }
      },
      onSuccessOfLogin() {
        this.$router.push("/")
        const userId = localStorage.getItem("userId");
        this.GET_NOTIFICATION(userId);
        this.GET_ALL_USERS(0, this.onSuccessUsers);
      },
      ...mapActions(useAppStore, ["LOGIN", "GET_NOTIFICATION", "GET_ALL_USERS"]),
    },
    
  computed: {
    ...mapState(useAppStore, ["data","loginStatus"]),
  },
  // created() {
  //   this.showNavBar = false;
  // },
};  