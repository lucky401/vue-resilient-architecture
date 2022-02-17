<template>
  <v-text-field
    dense
    outlined
    clearable
    color="info"
    hide-details
    class="body-2"
    v-model="innerValue"
    :disabled="disabled"
    append-icon="mdi-magnify"
    :placeholder="placeholder"
    :full-width="isBreakpointXs"
  />
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: '',
    },

    placeholder: {
      type: String,
      default: 'Search',
    },
  },

  data() {
    return {
      innerValue: false,
    };
  },

  computed: {
    isBreakpointXs() {
      return this.$vuetify.breakpoint.name === 'xs';
    },
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
</script>
