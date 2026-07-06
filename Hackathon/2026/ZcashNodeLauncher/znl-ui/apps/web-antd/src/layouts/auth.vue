<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';

import { AuthPageLayout } from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useAccessStore } from '@vben/stores';

import { getRandomGlobeData } from '#/api/zcash/index';
import { $t } from '#/locales';

const accessStore = useAccessStore();

const tenantIdLoaded = ref(false);
const mounted = ref(false);

watch(
  () => accessStore.tenantId,
  async (newVal, oldVal) => {
    if (newVal != null) {
      tenantIdLoaded.value = true;
      await loadGlobeDataOnce();
    }
  },
  { immediate: true },
);

const globeDataLoaded = ref(false);

async function loadGlobeDataOnce() {
  if (!tenantIdLoaded.value || !mounted.value) {
    return;
  }
  if (globeDataLoaded.value) {
    return;
  }

  const globeData = await getRandomGlobeData({});
  pointsData.value = globeData.pointsData || [];
  arcsData.value = globeData.arcsData || [];
  globeDataLoaded.value = true;
}

const appName = computed(() => preferences.app.name);
const logo = computed(() => preferences.logo.source);

const pointsData = ref<any[]>([]);
const arcsData = ref<any[]>([]);

onMounted(async () => {
  mounted.value = true;
  await loadGlobeDataOnce();
});
</script>

<template>
  <AuthPageLayout
    :app-name="appName"
    :logo="logo"
    :page-description="$t('authentication.pageDesc')"
    :page-title="$t('authentication.pageTitle')"
    :points-data="pointsData"
    :arcs-data="arcsData"
  >
    <!-- Custom Toolbar -->
    <!-- <template #toolbar></template> -->
  </AuthPageLayout>
</template>
