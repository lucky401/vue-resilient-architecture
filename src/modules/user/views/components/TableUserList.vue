<template>
  <v-data-table
    v-show="items.length > 0"
    mobile-breakpoint="1"
    :items-per-page="-1"
    class="custom-table"
    hide-default-footer
    min-height="250px"
    :headers="headers"
    :height="height"
    :items="items"
    fixed-header
  >
    <template v-slot:[`item.name`]="{ item }">
      <router-link
        :to="{
          name: 'employee-profile',
          params: {
            id: item.userId,
          },
        }"
      >
        <span class="text-capitalize info--text">
          {{ item.name }}
        </span>
      </router-link>
    </template>
    <template v-slot:[`item.email`]="{ item }">
      {{ item.email || '-' }}
    </template>
    <template v-slot:[`item.phone`]="{ item }">
      {{ item.phone || '-' }}
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            outlined
            width="34"
            elevation="0"
            min-width="34"
            color="info"
            class="text-capitalize mx-1"
            v-on="on"
            v-bind="attrs"
            @click="() => updateHandler(item)"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Edit</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            outlined
            width="34"
            elevation="0"
            min-width="34"
            color="error"
            class="text-capitalize mx-1"
            v-on="on"
            v-bind="attrs"
            @click="() => removeHandler(item)"
          >
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Remove</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
  },

  data() {
    return {
      headers: [
        {
          text: 'Action',
          class: 'font-weight-semibold',
          width: 150,
          value: 'action',
        },
        {
          text: 'Name',
          class: 'font-weight-semibold',
          width: 150,
          value: 'name',
        },
        {
          text: 'Email',
          class: 'font-weight-semibold',
          width: 150,
          value: 'email',
        },
        {
          text: 'Phone',
          class: 'font-weight-semibold',
          width: 150,
          value: 'phone',
        },
      ],
    };
  },

  computed: {
    height() {
      return this.$vuetify.breakpoint.name !== 'xs'
        ? 'calc(100vh - 296px)'
        : '';
    },
  },

  methods: {
    updateHandler(item) {
      this.$emit('update', item);
    },

    removeHandler(item) {
      this.$emit('remove', item);
    },
  },
};
</script>
