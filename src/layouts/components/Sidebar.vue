<template>
  <v-navigation-drawer
    v-model="innerValue"
    app
    fixed
    :permanent="!isMobile"
    color="secondary darken-2"
    width="230"
  >
    <v-list-item to="/">
      <v-list-item-content>
        <v-list-item-title
          class="primary--text font-weight-bold text-h4 d-flex justify-center align-center"
        >
          <v-img
            contain
            max-width="30"
            max-height="30"
            :src="require('@/assets/logo.svg')"
            class="mr-1"
          />
          <span> Sentinel </span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list nav class="px-0" v-for="groupMenu in items" :key="groupMenu.name">
      <v-subheader class="secondary--text text-capitalize">
        {{ groupMenu.name }}
      </v-subheader>
      <v-list-item
        v-for="item in groupMenu.items"
        :key="item.title"
        :to="item.path"
        exact
        active-class="menu-active secondary lighten-1"
      >
        <v-list-item-icon class="pl-4">
          <v-icon color="accent">
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="accent--text">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
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
      items: [
        {
          name: 'General',
          items: [
            {
              title: 'Home',
              icon: 'mdi-text-box-multiple-outline',
              path: '/home',
            },
          ],
        },
        {
          name: 'Settings',
          items: [
            { title: 'Users', icon: 'mdi-account-multiple', path: '/users' },
          ],
        },
      ],
    };
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
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

<style lang="scss" scoped>
.menu-active {
  position: relative;
}
.menu-active .v-list-item__icon:before {
  content: '';
  top: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  width: 3px;
  background-color: #ffec78;
}
</style>
