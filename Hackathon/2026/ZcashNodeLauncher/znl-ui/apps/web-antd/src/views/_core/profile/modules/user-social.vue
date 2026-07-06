<script setup lang="tsx">
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemSocialUserApi } from '#/api/system/social/user';

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { confirm } from '@vben/common-ui';
import { DICT_TYPE, SystemUserSocialTypeEnum } from '@vben/constants';
import { getDictLabel } from '@vben/hooks';
import { getUrlValue } from '@vben/utils';

import { Button, Card, Image, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { socialAuthRedirect } from '#/api/core/auth';
import { socialBind, socialUnbind } from '#/api/system/social/user';
import { $t } from '#/locales';

const emit = defineEmits<{
  (e: 'update:activeName', v: string): void;
}>();

const route = useRoute();
/** Binded platform */
const bindList = ref<SystemSocialUserApi.SocialUser[]>([]);
const allBindList = computed<any[]>(() => {
  return Object.values(SystemUserSocialTypeEnum).map((social) => {
    const socialUser = bindList.value.find((item) => item.type === social.type);
    return {
      ...social,
      socialUser,
    };
  });
});

function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'type',
      title: 'Bind Platform',
      minWidth: 100,
      cellRender: {
        name: 'CellDict',
        props: { type: DICT_TYPE.SYSTEM_SOCIAL_TYPE },
      },
    },
    {
      field: 'openid',
      title: 'Marking',
      minWidth: 180,
    },
    {
      field: 'nickname',
      title: 'Nickname',
      minWidth: 180,
    },
    {
      field: 'operation',
      title: 'Operation',
      minWidth: 80,
      align: 'center',
      fixed: 'right',
      slots: {
        default: ({ row }: { row: SystemSocialUserApi.SocialUser }) => {
          return (
            <Button onClick={() => onUnbind(row)} type="link">
              Untie.
            </Button>
          );
        },
      },
    },
  ];
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useGridColumns(),
    minHeight: 0,
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async () => {
          return bindList.value;
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    pagerConfig: {
      enabled: false,
    },
    toolbarConfig: {
      enabled: false,
    },
  } as VxeTableGridOptions<SystemSocialUserApi.SocialUser>,
});

/** Unlock account number */
function onUnbind(row: SystemSocialUserApi.SocialUser) {
  confirm({
    content: `Determined to untie the platform's [${getDictLabel} account number?`,
  }).then(async () => {
    await socialUnbind({ type: row.type, openid: row.openid });
    // Hint succeeded.
    message.success($t('ui.actionMessage.operationSuccess'));
    await gridApi.reload();
  });
}

/** Bind account number (jump to authorized page) */
async function onBind(bind: any) {
  const type = bind.type;
  if (type <= 0) {
    return;
  }
  try {
    // Calculating redact Uri
    // Tricky: type needs to encode first, otherwise the nail returns will be lost. Use the help getUrValue()
    const redirectUri = `${location.origin}/profile?${encodeURIComponent(`type=${type}`)}`;

    // Jump
    window.location.href = await socialAuthRedirect(type, redirectUri);
  } catch (error) {
    console.error('Error', error);
  }
}

/** Listen to the change of route. Handle the social tie-back. */
async function bindSocial() {
  // Socially binding.
  const type = Number(getUrlValue('type'));
  const code = route.query.code as string;
  const state = route.query.state as string;
  if (!code) {
    return;
  }
  await socialBind({ type, code, state });
  // Hint succeeded.
  message.success('Tied successfully.');
  emit('update:activeName', 'userSocial');
  await gridApi.reload();
  // Clear URL parameters and avoid refreshing repeat triggers
  window.history.replaceState({}, '', location.pathname);
}

/** Initialization */
onMounted(() => {
  bindSocial();
});
</script>

<template>
  <div class="flex flex-col">
    <Grid />

    <div class="pb-3">
      <div
        class="grid grid-cols-1 gap-2 px-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3"
      >
        <Card v-for="item in allBindList" :key="item.type" class="!mb-2">
          <div class="flex w-full items-center gap-4">
            <Image
              :src="item.img"
              :width="40"
              :height="40"
              :alt="item.title"
              :preview="false"
            />
            <div class="flex flex-1 items-center justify-between">
              <div class="flex flex-col">
                <h4 class="mb-1 text-sm text-black/85 dark:text-white/85">
                  {{ getDictLabel(DICT_TYPE.SYSTEM_SOCIAL_TYPE, item.type) }}
                </h4>
                <span class="text-black/45 dark:text-white/45">
                  <template v-if="item.socialUser">
                    {{ item.socialUser?.nickname || item.socialUser?.openid }}
                  </template>
                  <template v-else>
                    Tie it up.
                    {{ getDictLabel(DICT_TYPE.SYSTEM_SOCIAL_TYPE, item.type) }}
                    Account
                  </template>
                </span>
              </div>
              <Button
                :disabled="!!item.socialUser"
                size="small"
                type="link"
                @click="onBind(item)"
              >
                {{ item.socialUser ? 'Bind' : 'Tie it up.' }}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
