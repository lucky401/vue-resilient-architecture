import debounce from 'lodash.debounce';

import commonServices from '@/common/services';

export default {
  data() {
    return {
      formRegionName: null,
      provinceOptions: [],
      isLoadingProvinceOptions: false,
      isDisabledProvinceOptions: false,
      searchProvinceOptions: null,
      cityOptions: [],
      isLoadingCityOptions: false,
      isDisabledCityOptions: true,
      searchCityOptions: null,
      subdistrictOptions: [],
      isLoadingSubdistrictOptions: false,
      isDisabledSubdistrictOptions: true,
      searchSubdistrictOptions: null,
      villageOptions: [],
      isLoadingVillageOptions: false,
      isDisabledVillageOptions: true,
      searchVillageOptions: null,
    };
  },

  computed: {
    provinceWatcher() {
      return this[this.formRegionName].province;
    },

    cityWatcher() {
      return this[this.formRegionName].city;
    },

    subdistrictWatcher() {
      return this[this.formRegionName].subdistrict;
    },
  },

  watch: {
    provinceWatcher(newValue) {
      if (!this.formRegionName) return;

      const form = this[this.formRegionName];

      form.city = null;
      form.subdistrict = null;
      form.village = null;

      this.subdistrictOptions = [];
      this.villageOptions = [];

      this.isDisabledCityOptions = true;
      this.isDisabledSubdistrictOptions = true;
      this.isDisabledVillageOptions = true;

      if (newValue) {
        this.isDisabledCityOptions = false;
        this.getCityOptions();
      }
    },

    cityWatcher(newValue) {
      if (!this.formRegionName) return;

      const form = this[this.formRegionName];

      form.subdistrict = null;
      form.village = null;

      this.subdistrictOptions = [];
      this.villageOptions = [];

      this.isDisabledSubdistrictOptions = true;
      this.isDisabledVillageOptions = true;

      if (newValue) {
        this.isDisabledSubdistrictOptions = false;
        this.getSubdistrictOptions();
      }
    },

    subdistrictWatcher(newValue) {
      if (!this.formRegionName) return;

      const form = this[this.formRegionName];

      form.village = null;

      this.villageOptions = [];

      this.isDisabledVillageOptions = true;

      if (newValue) {
        this.isDisabledVillageOptions = false;
        this.getVillageOptions();
      }
    },

    searchProvinceOptions: debounce(function (newValue) {
      this.getProvinceOptions(newValue);
    }, 500),

    searchCityOptions: debounce(function (newValue) {
      this.getCityOptions(newValue);
    }, 500),

    searchSubdistrictOptions: debounce(function (newValue) {
      this.getSubdistrictOptions(newValue);
    }, 500),

    searchVillageOptions: debounce(function (newValue) {
      this.getVillageOptions(newValue);
    }, 500),
  },

  methods: {
    async getProvinceOptions(keyword = '') {
      this.isLoadingProvinceOptions = true;

      const filters = {
        page: 1,
        search: keyword || undefined,
      };

      try {
        const {
          data: { data },
        } = await commonServices.region.province(filters);
        this.provinceOptions = data;
        return data;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        this.isLoadingProvinceOptions = false;
      }
    },

    async getCityOptions(keyword = '') {
      const province = this[this.formRegionName].province;

      if (!province) return;

      this.isLoadingCityOptions = true;

      const filters = {
        page: 1,
        search: keyword || undefined,
        province_id: province.id,
      };

      try {
        const {
          data: { data },
        } = await commonServices.region.city(filters);
        this.cityOptions = data;
        return data;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        this.isLoadingCityOptions = false;
      }
    },

    async getSubdistrictOptions(keyword = '') {
      const city = this[this.formRegionName].city;

      if (!city) return;

      this.isLoadingSubdistrictOptions = true;

      const filters = {
        page: 1,
        search: keyword || undefined,
        regency_id: city.id,
      };

      try {
        const {
          data: { data },
        } = await commonServices.region.subdistrict(filters);
        this.subdistrictOptions = data;
        return data;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        this.isLoadingSubdistrictOptions = false;
      }
    },

    async getVillageOptions(keyword = '') {
      const subdistrict = this[this.formRegionName].subdistrict;

      if (!subdistrict) return;

      this.isLoadingVillageOptions = true;

      const filters = {
        page: 1,
        search: keyword || undefined,
        district_id: subdistrict.id,
      };

      try {
        const {
          data: { data },
        } = await commonServices.region.village(filters);
        this.villageOptions = data;
        return data;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        this.isLoadingVillageOptions = false;
      }
    },
  },
};
