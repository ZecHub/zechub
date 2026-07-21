<script setup lang="ts">
import type { SystemUserProfileApi } from '#/api/system/user/profile';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Tabs } from 'ant-design-vue';

import { getUserProfile } from '#/api/system/user/profile';
import { useAuthStore } from '#/store';

import BaseInfo from './modules/base-info.vue';
import ProfileUser from './modules/profile-user.vue';
import ResetPwd from './modules/reset-pwd.vue';
import UserSocial from './modules/user-social.vue';

const authStore = useAuthStore();
const activeName = ref('basicInfo');

/** Load Personal Information */
const profile = ref<SystemUserProfileApi.UserProfileRespVO>();
async function loadProfile() {
  profile.value = await getUserProfile();
}

/** Refresh Personal Information */
async function refreshProfile() {
  // Load Personal Information
  await loadProfile();

  // Update store
  await authStore.fetchUserInfo();
}

/** Initialization */
onMounted(loadProfile);
</script>

<template>
  <Page auto-content-height>
    <div class="flex">
      <!-- Left  -->
      <Card class="w-2/5" title="Personal information">
        <ProfileUser :profile="profile" @success="refreshProfile" />
      </Card>

      <!-- Right  -->
      <Card class="ml-3 w-3/5">
        <Tabs v-model:active-key="activeName" class="-mt-4">
          <Tabs.TabPane key="basicInfo" tab="Basic Settings">
            <BaseInfo :profile="profile" @success="refreshProfile" />
          </Tabs.TabPane>
          <Tabs.TabPane key="resetPwd" tab="Password Settings">
            <ResetPwd />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="userSocial"
            tab="Socially binding."
            force-render
            v-if="false"
          >
            <UserSocial @update:active-name="activeName = $event" />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  </Page>
</template>
