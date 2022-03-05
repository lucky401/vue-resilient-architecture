import debounce from 'lodash.debounce';

import commonServices from '@/common/services';

export default {
  data() {
    return {
      roleOptions: [],
      searchRoleOptions: null,
      isLoadingRoleOptions: false,
    };
  },

  watch: {
    searchRoleOptions: debounce(function (newValue) {
      this.getRoleOptions(newValue);
    }, 500),
  },

  methods: {
    async getRoleOptions(keyword = '') {
      this.isLoadingRoleOptions = true;

      const filters = {
        page: 1,
        search: keyword || undefined,
      };

      try {
        const {
          data: { data },
        } = await commonServices.role.list(filters);
        this.roleOptions = data;
        return data;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        this.isLoadingRoleOptions = false;
      }
    },
  },
};
