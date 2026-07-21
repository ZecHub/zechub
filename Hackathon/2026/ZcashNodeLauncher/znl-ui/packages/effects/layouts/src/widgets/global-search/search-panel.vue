<script setup lang="ts">
import type { MenuRecordRaw } from '@vben/types';

import { nextTick, onMounted, ref, shallowRef, watch } from 'vue';
import { useRouter } from 'vue-router';

import { SearchX, X } from '@vben/icons';
import { $t } from '@vben/locales';
import { mapTree, traverseTreeValues, uniqueByField } from '@vben/utils';

import { VbenIcon, VbenScrollbar } from '@vben-core/shadcn-ui';
import { isHttpUrl } from '@vben-core/shared/utils';

import { onKeyStroke, useLocalStorage, useThrottleFn } from '@vueuse/core';

defineOptions({
  name: 'SearchPanel',
});

const props = withDefaults(
  defineProps<{ keyword?: string; menus?: MenuRecordRaw[] }>(),
  {
    keyword: '',
    menus: () => [],
  },
);
const emit = defineEmits<{ close: [] }>();

const router = useRouter();
const searchHistory = useLocalStorage<MenuRecordRaw[]>(
  `__search-history-${location.hostname}__`,
  [],
);
const activeIndex = ref(-1);
const searchItems = shallowRef<MenuRecordRaw[]>([]);
const searchResults = ref<MenuRecordRaw[]>([]);

const handleSearch = useThrottleFn(search, 200);

// Search function to find matching menu entries based on search keywords
function search(searchKey: string) {
  // Remove the space before and after the search keyword
  searchKey = searchKey.trim();

  // If search keywords are empty, empty search results and return
  if (!searchKey) {
    searchResults.value = [];
    return;
  }

  // Create regular expression using search keywords
  const reg = createSearchReg(searchKey);

  // Initialize result arrays
  const results: MenuRecordRaw[] = [];

  // Walk Through Search Items
  traverseTreeValues(searchItems.value, (item) => {
    // Add the name of the menu item to the result array if it matches the regular expression
    if (reg.test(item.name?.toLowerCase())) {
      results.push(item);
    }
  });

  // Update Search Results
  searchResults.value = results;

  // If search results are available, set index to 0
  if (results.length > 0) {
    activeIndex.value = 0;
  }

  // Estimation index is 0
  activeIndex.value = 0;
}

// When the keyboard up and down keys move to an invisible place
// the scroll bar needs to scroll automatically
function scrollIntoView() {
  const element = document.querySelector(
    `[data-search-item="${activeIndex.value}"]`,
  );

  if (element) {
    element.scrollIntoView({ block: 'nearest' });
  }
}

// enter keyboard event
async function handleEnter() {
  if (searchResults.value.length === 0) {
    return;
  }
  const result = searchResults.value;
  const index = activeIndex.value;
  if (result.length === 0 || index < 0) {
    return;
  }
  const to = result[index];
  if (to) {
    searchHistory.value = uniqueByField([...searchHistory.value, to], 'path');
    handleClose();
    await nextTick();
    if (isHttpUrl(to.path)) {
      window.open(to.path, '_blank');
    } else {
      router.push({ path: to.path, replace: true });
    }
  }
}

// Arrow key up
function handleUp() {
  if (searchResults.value.length === 0) {
    return;
  }
  activeIndex.value--;
  if (activeIndex.value < 0) {
    activeIndex.value = searchResults.value.length - 1;
  }
  scrollIntoView();
}

// Arrow key down
function handleDown() {
  if (searchResults.value.length === 0) {
    return;
  }
  activeIndex.value++;
  if (activeIndex.value > searchResults.value.length - 1) {
    activeIndex.value = 0;
  }
  scrollIntoView();
}

// close search modal
function handleClose() {
  searchResults.value = [];
  emit('close');
}

// Activate when the mouse moves to a certain line
function handleMouseenter(e: MouseEvent) {
  const index = (e.target as HTMLElement)?.dataset.index;
  activeIndex.value = Number(index);
}

function removeItem(index: number) {
  if (props.keyword) {
    searchResults.value.splice(index, 1);
  } else {
    searchHistory.value.splice(index, 1);
  }
  activeIndex.value = Math.max(activeIndex.value - 1, 0);
  scrollIntoView();
}

// Store all special characters that require transliteration
const code = new Set([
  '$',
  '(',
  ')',
  '*',
  '+',
  '.',
  '?',
  '[',
  '\\',
  ']',
  '^',
  '{',
  '|',
  '}',
]);

// Convert function to convert special characters
function transform(c: string) {
  // Returns the character after transfer if the character is in the list of special characters
  // If not, return the character itself
  return code.has(c) ? `\\${c}` : c;
}

// Create Search Regular Expression
function createSearchReg(key: string) {
  // Split Entered Strings into Single Characters
  // Convert each character
  // Then connect all characters with '.*' and create regular expressions
  const keys = [...key].map((item) => transform(item)).join('.*');
  // Returns created regular expression
  return new RegExp(`.*${keys}.*`);
}

watch(
  () => props.keyword,
  (val) => {
    if (val) {
      handleSearch(val);
    } else {
      searchResults.value = [...searchHistory.value];
    }
  },
);

onMounted(() => {
  searchItems.value = mapTree(props.menus, (item) => {
    return {
      ...item,
      name: $t(item?.name),
    };
  });
  if (searchHistory.value.length > 0) {
    searchResults.value = searchHistory.value;
  }
  // enter search
  onKeyStroke('Enter', handleEnter);
  // Monitor keyboard arrow keys
  onKeyStroke('ArrowUp', handleUp);
  onKeyStroke('ArrowDown', handleDown);
  // esc close
  onKeyStroke('Escape', handleClose);
});
</script>

<template>
  <VbenScrollbar>
    <div class="!flex h-full justify-center px-2 sm:max-h-[450px]">
      <!-- No search results -->
      <div
        v-if="keyword && searchResults.length === 0"
        class="text-muted-foreground text-center"
      >
        <SearchX class="mx-auto mt-4 size-12" />
        <p class="mb-10 mt-6 text-xs">
          {{ $t('ui.widgets.search.noResults') }}
          <span class="text-foreground text-sm font-medium">
            "{{ keyword }}"
          </span>
        </p>
      </div>
      <!-- History search records & No search results -->
      <div
        v-if="!keyword && searchResults.length === 0"
        class="text-muted-foreground text-center"
      >
        <p class="my-10 text-xs">
          {{ $t('ui.widgets.search.noRecent') }}
        </p>
      </div>

      <ul v-show="searchResults.length > 0" class="w-full">
        <li
          v-if="searchHistory.length > 0 && !keyword"
          class="text-muted-foreground mb-2 text-xs"
        >
          {{ $t('ui.widgets.search.recent') }}
        </li>
        <li
          v-for="(item, index) in uniqueByField(searchResults, 'path')"
          :key="item.path"
          :class="
            activeIndex === index
              ? 'active bg-primary text-primary-foreground'
              : ''
          "
          :data-index="index"
          :data-search-item="index"
          class="bg-accent flex-center group mb-3 w-full cursor-pointer rounded-lg px-4 py-4"
          @click="handleEnter"
          @mouseenter="handleMouseenter"
        >
          <VbenIcon
            :icon="item.icon"
            class="mr-2 size-5 flex-shrink-0"
            fallback
          />

          <span class="flex-1">{{ item.name }}</span>
          <div
            class="flex-center dark:hover:bg-accent hover:text-primary-foreground rounded-full p-1 hover:scale-110"
            @click.stop="removeItem(index)"
          >
            <X class="size-4" />
          </div>
        </li>
      </ul>
    </div>
  </VbenScrollbar>
</template>