<template>
  <v-main class="secondary darken-2">
    <v-container fluid class="pa-0">
      <v-row
        justify="center"
        no-gutters
        align="center"
        style="min-height: 100vh"
      >
        <v-col cols="12">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
