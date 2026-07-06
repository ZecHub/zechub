import type {
  // The definition suffix of the series type is the serviceOption
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  MapSeriesOption,
} from 'echarts/charts';
import type {
  DatasetComponentOption,
  GeoComponentOption,
  GridComponentOption,
  // Defined suffix for component type is ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  VisualMapComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

import {
  BarChart,
  FunnelChart,
  GaugeChart,
  LineChart,
  MapChart,
  PieChart,
  RadarChart,
} from 'echarts/charts';
import {
  // Dataset Component
  DatasetComponent,
  GeoComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  // Internal Data Converter Component (filter, sort)
  TransformComponent,
  VisualMapComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// Group an option type that only requires components and graphs through ComposeOption
export type ECOption = ComposeOption<
  | BarSeriesOption
  | DatasetComponentOption
  | GaugeSeriesOption
  | GeoComponentOption
  | GridComponentOption
  | LineSeriesOption
  | MapSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | VisualMapComponentOption
>;

// Required components for registration
echarts.use([
  TitleComponent,
  PieChart,
  RadarChart,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  FunnelChart,
  GaugeChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
  VisualMapComponent,
  MapChart,
  GeoComponent,
]);

export default echarts;