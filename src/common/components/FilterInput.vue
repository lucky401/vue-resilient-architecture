<template>
  <v-autocomplete
    dense
    outlined
    clearable
    cache-items
    color="info"
    hide-details
    class="body-2"
    :items="options"
    :loading="isLoading"
    v-model="innerValue"
    :disabled="disabled"
    :item-text="itemText"
    :item-value="itemValue"
    :placeholder="placeholder"
    :full-width="isBreakpointXs"
    :return-object="returnObject"
    :search-input.sync="innerSearchValue"
  />
</template>

<script>
export default {
  props: {
    itemText: {
      type: String,
      default: 'label',
    },

    itemValue: {
      type: String,
      default: 'value',
    },

    returnObject: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    options: {
      type: Array,
      required: true,
    },

    search: {
      type: String,
      default: '',
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null,
    },

    placeholder: {
      type: String,
      default: 'Filter',
    },
  },

  data() {
    return {
      innerValue: '',
      innerSearchValue: '',
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

    search(val) {
      this.innerSearchValue = val;
    },

    innerValue(val) {
      this.$emit('input', val);
    },

    innerSearchValue(val) {
      this.$emit('update:search', val);
    },
  },

  mounted() {
    this.innerValue = this.value;
  },
};
</script>
