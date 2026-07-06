<script lang="ts" setup>
import type { Dayjs } from 'dayjs';

import { onMounted, ref } from 'vue';

import { DatePicker, Radio, RadioGroup } from 'ant-design-vue';

import { getRangePickerDefaultProps } from '#/utils/rangePickerProps';

/** Shortcut Date Range Selection Component */
defineOptions({ name: 'ShortcutDateRangePicker' });

const emits = defineEmits<{
  change: [times: [Dayjs, Dayjs]];
}>();

const times = ref<[Dayjs, Dayjs]>(); // Date Range

const rangePickerProps = getRangePickerDefaultProps();
const timeRangeOptions = [
  rangePickerProps.presets[3]!, // Yesterday.
  rangePickerProps.presets[1]!, // Recent 7 Days
  rangePickerProps.presets[2]!, // Recent 30 Days
];
const timeRangeType = ref(timeRangeOptions[1]!.label); // Select the first option by default

/** Set the time frame */
function setTimes() {
  // Set the time frame according to the selected option
  const selectedOption = timeRangeOptions.find(
    (option) => option.label === timeRangeType.value,
  );
  if (selectedOption) {
    times.value = selectedOption.value as [Dayjs, Dayjs];
  }
}

/** Shortcut Date Single Button Selected */
async function handleShortcutDaysChange() {
  // Set the time frame
  setTimes();
  // Trigger time range selection event
  emitDateRangePicker();
}

/** Change of date range */
function handleDateRangeChange() {
  emitDateRangePicker();
}

/** Trigger time range selection event */
function emitDateRangePicker() {
  if (times.value && times.value.length === 2) {
    emits('change', times.value);
  }
}

/** Initialization */
onMounted(() => {
  handleShortcutDaysChange();
});
</script>

<template>
  <div class="flex items-center gap-2">
    <RadioGroup
      v-model:value="timeRangeType"
      @change="handleShortcutDaysChange"
    >
      <Radio
        v-for="option in timeRangeOptions"
        :key="option.label"
        :value="option.label"
      >
        {{ option.label }}
      </Radio>
    </RadioGroup>
    <DatePicker.RangePicker
      v-model:value="times"
      :format="rangePickerProps.format"
      :value-format="rangePickerProps.valueFormat"
      :placeholder="rangePickerProps.placeholder"
      :presets="rangePickerProps.presets"
      class="!w-[235px]"
      @change="handleDateRangeChange"
    />
    <slot></slot>
  </div>
</template>