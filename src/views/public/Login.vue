<template>
  <authLayout>
    <login />
  </authLayout>
</template>

<script>
import authLayout from '@/layouts/auth.layout';

import login from '@/modules/login/login.component';

export default {
  components: {
    authLayout,
    login,
  },
};
</script>
