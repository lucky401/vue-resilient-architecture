<template>
  <general-layout>
    <home />
  </general-layout>
</template>

<script>
import generalLayout from '@/layouts/general.layout';

import home from '@/modules/home/home.component';

export default {
  components: {
    generalLayout,
    home,
  },
};
</script>
