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
            console.log("Form is invalid. Cannot submit.");
          }
      },
      onSuccessOfLogin() {
        this.$router.push("/")
        const userId = localStorage.getItem("userId");
        this.GET_NOTIFICATION(userId);
      },
      ...mapActions(useAppStore, ["LOGIN", "GET_NOTIFICATION"]),
    },
    
  computed: {
    ...mapState(useAppStore, ["data","loginStatus"]),
  },
  // created() {
  //   this.showNavBar = false;
  // },
};  