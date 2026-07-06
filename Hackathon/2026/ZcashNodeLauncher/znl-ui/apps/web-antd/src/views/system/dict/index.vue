<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import DataGrid from './modules/data-grid.vue';
import TypeGrid from './modules/type-grid.vue';

const searchDictType = ref<string>(); //

function handleDictTypeSelect(dictType: string) {
  searchDictType.value = dictType;
}
</script>

<template>
  <Page auto-content-height>
    <div class="flex h-full">
      <!-- List of Left Dictionary Types -->
      <div class="w-1/2 pr-3">
        <TypeGrid @select="handleDictTypeSelect" />
      </div>
      <!-- Right Dictionary Data List -->
      <div class="w-1/2">
        <DataGrid :dict-type="searchDictType" />
      </div>
    </div>
  </Page>
</template>
