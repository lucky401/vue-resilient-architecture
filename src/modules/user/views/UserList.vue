<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <card-users-list-component />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardUsersListComponent from './components/CardUsersList';

export default {
  components: {
    CardUsersListComponent,
  },
};
</script>
