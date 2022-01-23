export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      innerValue: false,
    };
  },

  watch: {
    value(val) {
      this.innerValue = val;
    },

    innerValue(val) {
      this.$emit('input', val);
    },
  },

  mounted() {
    this.innerValue = this.value;
  },
};
