<template>
  <authLayout>
    <login-component />
  </authLayout>
</template>

<script>
import AuthLayout from '@/layouts/Auth';

import LoginComponent from '@/modules/login/Login';

export default {
  components: {
    AuthLayout,
    LoginComponent,
  },
};
</script>
