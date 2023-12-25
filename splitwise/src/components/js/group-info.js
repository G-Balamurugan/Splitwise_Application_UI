export default {
    props: {
      groupDetail: Object,
    },
    methods: {
      closeGroupInfo() {
        this.$emit("closeGroupInfo");
      },
    },
  };