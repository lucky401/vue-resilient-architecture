<template>
  <fragment>
    <dialog-filter-user-component
      v-model="dialog.filter"
      :filters="innerFilter"
      @saved="filterHandler"
    />
    <dialog-form-user-component
      v-model="dialog.form"
      :temp-data="tempData"
      @saved="savedHandler"
      @close="resetDialogHandler"
    />
    <dialog-form-remove-user-component
      v-model="dialog.remove"
      :temp-data="tempData"
      @removed="savedHandler"
      @close="resetDialogHandler"
    />
    <v-card flat>
      <v-card-title>
        <h2 class="text-h5 grey--text text--darken-1">List Users</h2>
      </v-card-title>
      <v-card-subtitle class="d-sm-flex align-center justify-end mt-0">
        <v-btn
          height="40"
          color="info"
          elevation="0"
          class="mr-sm-auto my-2"
          :block="isBreakpointXs"
          @click="dialog.form = true"
        >
          <v-icon small>mdi-plus</v-icon> User
        </v-btn>
        <v-sheet class="mr-sm-2 my-2" :width="isBreakpointXs ? '100%' : ''">
          <search-input-component
            placeholder="Find Users . . ."
            v-model="innerFilter.search"
          />
        </v-sheet>
        <v-btn
          height="40"
          elevation="0"
          class="my-2"
          color="secondary"
          :block="isBreakpointXs"
          @click="dialog.filter = true"
        >
          Filter
        </v-btn>
      </v-card-subtitle>
      <v-card-text v-if="status !== 'rejected'">
        <table-skeleton-loading-indicator-component
          :is-loading="status === 'pending'"
        >
          <table-user-list-component
            :items="users"
            @update="updateHandler"
            @remove="removeHandler"
          />
        </table-skeleton-loading-indicator-component>
        <data-not-found-component
          v-if="status === 'resolved' && users.length < 1"
        />
      </v-card-text>
      <v-card-actions class="pb-6 px-6" v-if="status === 'resolved'">
        <v-container fluid>
          <v-row>
            <v-col v-if="users.length > 0" cols="5" class="d-none d-md-block">
              <span class="body-2 font-weight-bold mt-4">
                Total {{ pagination && pagination.recordsTotal }} data
              </span>
            </v-col>
            <v-col
              v-if="pagination && pagination.lastPage > 1"
              cols="12"
              md="7"
            >
              <v-pagination
                class="float-sm-right"
                :value="page"
                :length="pagination && pagination.lastPage"
                @input="changePageHandler"
                :total-visible="5"
                color="info"
                circle
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
      <v-card-text v-if="status === 'rejected'">
        <module-error-component :error-message="errorMessage" />
      </v-card-text>
    </v-card>
  </fragment>
</template>

<script>
import debounce from 'lodash.debounce';

import { Fragment } from 'vue-frag';

import VuexModule from '@/utils/vuex';

import * as ROOTTYPES from '@/store-namespace/root/types';
import * as USERTYPES from '../../store/types';

const rootModule = VuexModule(ROOTTYPES.MODULE_NAME);
const userModule = VuexModule(USERTYPES.MODULE_NAME);

import SearchInputComponent from '@/common/components/SearchInput';
import ModuleErrorComponent from '@/common/components/ModuleError';
import DataNotFoundComponent from '@/common/components/DataNotFound';
import TableSkeletonLoadingIndicatorComponent from '@/common/components/TableSkeletonLoadingIndicator';

import DialogFormUserComponent from './DialogFormUser';
import DialogFilterUserComponent from './DialogFilterUser';
import DialogFormRemoveUserComponent from './DialogFormRemoveUser';
import TableUserListComponent from './TableUserList';

export default {
  components: {
    Fragment,
    SearchInputComponent,
    ModuleErrorComponent,
    DataNotFoundComponent,
    DialogFormUserComponent,
    DialogFilterUserComponent,
    DialogFormRemoveUserComponent,
    TableUserListComponent,
    TableSkeletonLoadingIndicatorComponent,
  },

  data() {
    return {
      dialog: {
        form: false,
        filter: false,
        remove: false,
      },
      page: 1,
      limit: 10,
      tempData: null,
      innerFilter: {
        search: '',
      },
      users: [],
      status: 'idle',
      pagination: null,
    };
  },

  computed: {
    isBreakpointXs() {
      return this.$vuetify.breakpoint.name === 'xs';
    },

    ...rootModule.mapState({
      errorMessage: (state) => state.errorMessage[USERTYPES.FETCH_USER_LIST],
    }),
  },

  watch: {
    'innerFilter.search': {
      handler: debounce(function () {
        this.fetchResource();
      }, 500),
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    ...userModule.mapActions({
      fetchList: USERTYPES.FETCH_USER_LIST,
    }),

    init() {
      this.fetchResource();
    },

    async fetchResource() {
      this.status = 'pending';

      const filters = {
        page: this.page,
        limit: this.limit,
        search: this.innerFilter.search || undefined,
      };

      const payload = { filters };

      try {
        const { items, pagination } = await this.fetchList(payload);
        this.users = items;
        this.pagination = pagination;
        this.status = 'resolved';
      } catch (error) {
        this.users = [];
        this.pagination = null;
        this.status = 'rejected';
      }
    },

    changePageHandler(value) {
      this.page = value;
      this.fetchResource();
    },

    updateHandler(item) {
      this.tempData = {
        id: item.userId,
        name: item.name,
        email: item.email,
        phone: item.phone,
      };
      this.dialog.form = true;
    },

    removeHandler(item) {
      this.tempData = {
        id: item.department_id,
        name: item.name,
      };
      this.dialog.remove = true;
    },

    resetDialogHandler() {
      this.dialog = {
        form: false,
        remove: false,
      };
      this.tempData = {};
    },

    savedHandler() {
      this.page = 1;
      this.resetDialogHandler();
      this.fetchResource();
    },

    filterHandler(filter) {
      const newFilters = {
        ...this.innerFilter,
        ...filter,
      };

      this.innerFilter = newFilters;
    },
  },
};
</script>
