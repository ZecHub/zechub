import type { VxeTableInstance, VxeToolbarInstance } from 'vxe-table';

import { ref, watch } from 'vue';

import VbenVxeTableToolbar from './table-toolbar.vue';

/**
 * vxe Original Toolbar Mount Envelope* solves the problem that each component needs to write when using the vxe-table component
 */
export function useTableToolbar() {
  const hiddenSearchBar = ref(false); // Hide Search Bar
  const tableToolbarRef = ref<InstanceType<typeof VbenVxeTableToolbar>>();
  const tableRef = ref<VxeTableInstance>();
  const isBound = ref<boolean>(false);

  /** Mount Toolbar Toolbar */
  async function bindTableToolbar() {
    const table = tableRef.value;
    const tableToolbar = tableToolbarRef.value;
    if (table && tableToolbar) {
      // Delay 1 sec to make sure the toolbar component is mounted
      setTimeout(async () => {
        const toolbar = tableToolbar.getToolbarRef();
        if (!toolbar) {
          console.error('[toolbar mount failed] Table toolbar not found');
        }
        await table.connectToolbar(toolbar as VxeToolbarInstance);
        isBound.value = true;
      }, 1000); // Delay mount to ensure that toolbar is properly mounted
    }
  }

  watch(
    () => tableRef.value,
    async (val) => {
      if (!val || isBound.value) return;
      await bindTableToolbar();
    },
    { immediate: true },
  );

  return {
    hiddenSearchBar,
    tableToolbarRef,
    tableRef,
  };
}