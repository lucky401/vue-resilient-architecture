<template>
  <v-card flat :class="className" class="my-2">
    <v-card-title>
      <v-icon color="info" small class="mr-2"> mdi-twitter </v-icon>
      <span class="body-2">
        <span class="font-weight-bold">
          {{ mention.name }} ({{ mention.handle }})
        </span>
        <span class="text-capitalize blue--text">
          {{ mention.source.name }}
        </span>
        -
        {{ mention.datetime | datetime }}
      </span>
    </v-card-title>
    <v-card-subtitle class="caption secondary--text">
      {{ mention.source.url }}
    </v-card-subtitle>
    <v-card-text>
      <p class="body-1 grey--text text--darken-1">{{ mention.content }}</p>
      <v-row>
        <v-col cols="8"> </v-col>
        <v-col cols="4">
          <v-container fluid class="text-center">
            <v-row align="center" dense>
              <v-col cols="4">
                <v-icon color="secondary">mdi-repeat-variant</v-icon>
                {{ mention.retweet }}
              </v-col>
              <v-col cols="4">
                <v-icon color="secondary">mdi-heart-outline</v-icon>
                {{ mention.retweet }}
              </v-col>
              <v-col cols="4">
                <v-icon color="secondary">mdi-gender-male</v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    mention: {
      type: Object,
      required: true,
    },
  },
  computed: {
    className() {
      if (this.mention.sentiment === 'positive') {
        return 'positive-card';
      } else if (this.mention.sentiment === 'negative') {
        return 'negative-card';
      }
      return 'neutral-card';
    },
  },
};
</script>

<style lang="scss" scoped>
.positive-card {
  border-left: 4px solid #4caf50;
}
.negative-card {
  border-left: 4px solid #f44336;
}
.neutral-card {
  border-left: 4px solid #9e9e9e;
}
</style>
