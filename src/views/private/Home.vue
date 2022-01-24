<template>
  <general-layout>
    <home-component />
  </general-layout>
</template>

<script>
import GeneralLayout from '@/layouts/General';

import HomeComponent from '@/modules/home/Home';

export default {
  components: {
    GeneralLayout,
    HomeComponent,
  },
};
</script>
