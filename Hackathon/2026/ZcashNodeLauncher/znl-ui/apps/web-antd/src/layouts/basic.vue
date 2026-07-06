<script lang="ts" setup>
import type { SystemTenantApi } from '#/api/system/tenant';

import { computed, onMounted, ref, watch } from 'vue';

import { useAccess } from '@vben/access';
import { AuthenticationLoginExpiredModal, useVbenModal } from '@vben/common-ui';
import { VBEN_GITHUB_URL } from '@vben/constants';
import {
  isTenantEnable,
  isTenantSwitchVisible,
  useTabs,
  useWatermark,
} from '@vben/hooks';
import { AntdProfileOutlined, SvgGithubIcon } from '@vben/icons';
import {
  BasicLayout,
  Help,
  LockScreen,
  TenantDropdown,
  UserDropdown,
} from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import { message } from 'ant-design-vue';

import { getSimpleTenantList } from '#/api/system/tenant';
import { $t } from '#/locales';
import { router } from '#/router';
import { useAuthStore } from '#/store';
import LoginForm from '#/views/_core/authentication/login.vue';

const userStore = useUserStore();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const { hasAccessByCodes } = useAccess();
const { destroyWatermark, updateWatermark } = useWatermark();
const { closeOtherTabs, refreshTab } = useTabs();

const [HelpModal, helpModalApi] = useVbenModal({
  connectedComponent: Help,
});

const menus = computed(() => [
  {
    handler: () => {
      router.push({ name: 'Profile' });
    },
    icon: AntdProfileOutlined,
    text: $t('ui.widgets.profile'),
  },
  {
    handler: () => {
      openWindow(VBEN_GITHUB_URL, {
        target: '_blank',
      });
    },
    icon: SvgGithubIcon,
    text: 'GitHub',
  },
]);

const avatar = computed(() => {
  return userStore.userInfo?.avatar ?? preferences.app.defaultAvatar;
});

async function handleLogout() {
  await authStore.logout(false);
}

// Tenant List
const tenants = ref<SystemTenantApi.Tenant[]>([]);
const tenantEnable = computed(
  () => hasAccessByCodes(['system:tenant:visit']) && isTenantEnable(),
);

const tenantDropdownClass = computed(() =>
  hasAccessByCodes(['system:tenant:visit']) &&
  isTenantEnable() &&
  isTenantSwitchVisible()
    ? ''
    : 'hidden',
);

/** Retrieve the tenant list */
async function handleGetTenantList() {
  if (tenantEnable.value) {
    tenants.value = await getSimpleTenantList();
  }
}

/** Processing Tenant Switches */
async function handleTenantChange(tenant: SystemTenantApi.Tenant) {
  if (!tenant || !tenant.id) {
    message.error('Failed to switch tenant');
    return;
  }
  // Set access to tenant ID
  accessStore.setVisitTenantId(tenant.id as number);
  // Close other tabs and keep the current page only
  await closeOtherTabs();
  // Refresh the current page
  await refreshTab();
  // Hint Switching Successfully
  message.success(`Switch the current tenant to: ${tenant.name}`);
}

// ========== Initialization==========
onMounted(() => {
  // Retrieve the tenant list
  handleGetTenantList();
});

watch(
  () => ({
    enable: preferences.app.watermark,
    content: preferences.app.watermarkContent,
  }),
  async ({ enable, content }) => {
    if (enable) {
      await updateWatermark({
        content:
          content ||
          `${userStore.userInfo?.id} - ${userStore.userInfo?.nickname}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <template #user-dropdown>
      <UserDropdown
        :avatar
        :menus
        :text="userStore.userInfo?.nickname"
        :description="userStore.userInfo?.email"
        :tag-text="userStore.userInfo?.username"
        @logout="handleLogout"
      />
    </template>
    <template #notification><div class="non-implemented"></div></template>
    <template #header-right-1>
      <div v-if="tenantEnable" :class="tenantDropdownClass">
        <TenantDropdown
          class="mr-2"
          :tenant-list="tenants"
          :visit-tenant-id="accessStore.visitTenantId"
          @success="handleTenantChange"
        />
      </div>
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal>
    </template>
    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
  <HelpModal />
</template>