<script lang="ts" setup>
import type { NodeNetProps } from './types';

import type { ZcashNodeServerApi } from '#/api/zcash/nodeServer';

import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useSlots,
  watchEffect,
} from 'vue';

import { confirm, Page, VbenCountToAnimator } from '@vben/common-ui';
import { useAppConfig } from '@vben/hooks';
import { IconifyIcon } from '@vben/icons';
import { $t } from '@vben/locales';
import { useAccessStore } from '@vben/stores';

import {
  BorderBox1,
  BorderBox13,
  Decoration1,
  Decoration7,
  Decoration8,
  Decoration9,
  Decoration10,
  Decoration11,
  Decoration12,
} from '@kjgl77/datav-vue3';
import { useWebSocket } from '@vueuse/core';
import { message, Modal } from 'ant-design-vue';
import Globe from 'globe.gl';
import _ from 'lodash';

import { startNodeServer, stopNodeServer } from '#/api/zcash/nodeServer';

const props = withDefaults(defineProps<NodeNetProps>(), {});

const emit = defineEmits([]);

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

const slots = useSlots();

const globeRef = ref<HTMLElement | null>(null);
const globeWrapperRef = ref<HTMLElement | null>(null);
const contentEl = ref<HTMLElement | null>(null);
const heightInitialized = ref(false);
const blockHeight = ref(3_292_616);
const verificationprogress = ref(0);
let globeInstance: any = null;

const operationInProgress = ref(false);

const OPACITY = 0.22;

const arcsData = ref<any[]>([]);
const pointsData = ref<any[]>([]);
const isFirstUpdateData = ref(true);
const maxVerificationPoint = ref<any>(null);

const selectedPoint = ref<any>(null);

const globeAltitude = 2.5;

async function initGlobe() {
  let clientWidth = globeWrapperRef.value?.clientWidth;
  if (!clientWidth) {
    clientWidth = 0;
  }
  let clientHeight = globeWrapperRef.value?.clientHeight;
  if (!clientHeight) {
    clientHeight = 0;
  }

  globeInstance = Globe()(globeRef.value)
    .width(clientWidth)
    .height(clientHeight)
    .globeImageUrl('/static/imgs/globe.gl/earth-night.jpg')
    .bumpImageUrl('/static/imgs/globe.gl/earth-topology.png')
    .backgroundImageUrl('/static/imgs/globe.gl/night-sky.png')
    .pointOfView({ lat: 39.6, lng: -98.5, altitude: globeAltitude }); // aim at continental US

  globeInstance
    .arcStartLat((d) => +d.startLat)
    .arcStartLng((d) => +d.startLng)
    .arcEndLat((d) => +d.endLat)
    .arcEndLng((d) => +d.endLng)
    .arcDashLength(0.25)
    .arcDashGap(1)
    .arcDashInitialGap(() => Math.random())
    .arcDashAnimateTime(4000)
    .arcColor((d) => [
      `rgba(0, 255, 0, ${OPACITY})`,
      `rgba(255, 0, 0, ${OPACITY})`,
    ])
    // .arcAltitude(0.4)
    .arcsTransitionDuration(0); //
  // .pointsMerge(true); //
  globeInstance
    .pointColor((d) => d.color || '#ffffff')
    .pointAltitude((d) => (d.type == 'node' ? 0.01 : 0.005)) //
    .pointRadius((d) => 0.2)
    .onPointClick((point: any) => {
      selectedPoint.value = point.type === 'node' ? point : null;
    });

  window.addEventListener('resize', handleResize);

  await loadGlobeData();
}

const accessStore = useAccessStore();
const refreshToken = accessStore.refreshToken as string;

let server = null;

if (import.meta.env.DEV) {
  server = ref(
    `${`${import.meta.env.VITE_BASE_URL}/zcash/ws/node-server/realtime-server-info`.replace(
      'http',
      'ws',
    )}?token=${refreshToken}`, // use refreshToken
  ); // WebSocket
} else {
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  server = ref(
    `${protocol}//${window.location.host}/zcash/ws/node-server/realtime-server-info?token=${refreshToken}`, // use refreshToken
  ); // WebSocket
}
const getIsOpen = computed(() => status.value === 'OPEN'); // websocket connected

const { status, data, send, close, open } = useWebSocket(server.value, {
  autoReconnect: true,
  heartbeat: true,
  onConnected: (ws) => {
    console.log('WebSocket connected');
  },
  onDisconnected: (ws, event) => {
    console.log('WebSocket closed', event);
  },
  onError: (ws, event) => {
    console.error('WebSocket error:', event);
  },
});

watchEffect(() => {
  if (!data.value || data.value == 'pong') {
    return;
  }
  try {
    const message = JSON.parse(data.value);

    if (message.type == 'globeData') {
      updateGlobeData(message.globeData);
    }
  } catch (error) {
    console.error(`error：${data.value}`);
    console.error(error);
  }
});

async function loadGlobeData() {
  open();
}

function updateGlobeData(globeData: any) {
  if (globeInstance == null) {
    return;
  }

  if (isFirstUpdateData.value && globeData.isDemo) {
    Modal.info({
      title: 'Notify',
      content:
        'You are now in the demo mode, you need deploy you self Zcash Node Launcher to see the reality data. ',
    });
  }

  maxVerificationPoint.value = null;
  blockHeight.value = 0;

  if (!_.isEqual(arcsData.value, globeData.arcsData || [])) {
    globeInstance.arcsData(_.cloneDeep(globeData.arcsData || []));
  }

  if (!_.isEqual(pointsData.value, globeData.pointsData || [])) {
    globeInstance.pointsData(_.cloneDeep(globeData.pointsData || []));
  }

  arcsData.value = globeData.arcsData || [];
  pointsData.value = globeData.pointsData || [];

  if (pointsData.value != null) {
    const nodePoints = pointsData.value.filter((d) => d.type === 'node');
    const runningNodePoints = nodePoints.filter(
      (d) => d?.nodeServer?.nodeStatus === 'running',
    );
    if (nodePoints && nodePoints.length > 0) {
      if (isFirstUpdateData.value) {
        if (runningNodePoints != null && runningNodePoints.length > 0) {
          globeInstance.pointOfView({
            lat: runningNodePoints[0].lat,
            lng: runningNodePoints[0].lng,
            altitude: globeAltitude,
          });
          selectedPoint.value = runningNodePoints[0];
        } else {
          globeInstance.pointOfView({
            lat: nodePoints[0].lat,
            lng: nodePoints[0].lng,
            altitude: globeAltitude,
          });
          selectedPoint.value = nodePoints[0];
        }

        isFirstUpdateData.value = false;
      }

      maxVerificationPoint.value = nodePoints[0];
      for (let i = 1; i < nodePoints.length; i++) {
        const currentVerificationprogress =
          nodePoints[i].nodeInfo?.blockchaininfo?.verificationprogress || 0;
        if (
          currentVerificationprogress >
          (maxVerificationPoint.value.nodeInfo?.blockchaininfo
            ?.verificationprogress || 0)
        ) {
          maxVerificationPoint.value = nodePoints[i];
        }
      }
      blockHeight.value =
        maxVerificationPoint.value.nodeInfo?.blockchaininfo?.estimatedheight ||
        0;
      verificationprogress.value = displayVerificationProgress(
        maxVerificationPoint.value.nodeInfo?.blockchaininfo
          ?.verificationprogress,
        2,
      );

      if (selectedPoint.value != null) {
        let selectedPointTemp = null;
        for (const nodePoint of nodePoints) {
          if (
            nodePoint.nodeServer != null &&
            nodePoint.nodeServer.id == selectedPoint.value.nodeServer.id
          ) {
            selectedPointTemp = nodePoint;
            break;
          }
        }

        selectedPoint.value = selectedPointTemp;
      }
    }
  }
}

function displayVerificationProgress(progress: number, precision: number) {
  return Number((Number(progress) * 100).toFixed(precision));
}

onMounted(async () => {});

const handleResize = () => {
  if (globeInstance && globeRef.value) {
    let clientWidth = globeWrapperRef.value?.clientWidth;
    if (!clientWidth) {
      clientWidth = 0;
    }
    let clientHeight = globeWrapperRef.value?.clientHeight;
    if (!clientHeight) {
      clientHeight = 0;
    }

    const globeWidth = clientWidth;
    const globeHeight = clientHeight;
    globeRef.value.style.width = `${globeWidth}px`;
    globeRef.value.style.height = `${globeHeight}px`;

    // globeRef.value.style.top = `${Number.parseInt(clientHeight * 0.15)}px`;
    // globeRef.value.style.left = `${Number.parseInt((clientWidth - globeWidth) * 0.5)}px`;

    globeInstance.width(globeWidth);
    globeInstance.height(globeHeight);
  }
};
onUnmounted(() => {
  if (globeRef.value) {
    globeRef.value.innerHTML = '';
  }
  window.removeEventListener('resize', handleResize);
  globeInstance?._destructor();
  // close();
});

async function onHeightInit(params) {
  heightInitialized.value = true;
  contentEl.value = params.el;
  await nextTick();
  setTimeout(async () => {
    await initGlobe();
  }, 100);
}

async function closeNodePanel() {
  selectedPoint.value = null;
}

/** Start node */
async function handleStartNode() {
  if (operationInProgress.value) {
    return;
  }
  const hideLoading = message.loading({
    content: $t('Starting...'),
    duration: 0,
  });
  try {
    operationInProgress.value = true;
    await startNodeServer({
      id: selectedPoint.value?.nodeServer?.id,
    } as ZcashNodeServerApi.NodeServer);
    message.success($t('Started'));
    await reloadNodeInfo();
  } finally {
    hideLoading();
    operationInProgress.value = false;
  }
}

/** Stop node */
async function handleStopNode() {
  if (operationInProgress.value) {
    return;
  }
  await confirm('Confirm stop node(Docker container)?');
  const hideLoading = message.loading({
    content: $t('Stopping...'),
    duration: 0,
  });
  try {
    operationInProgress.value = true;
    await stopNodeServer({
      id: selectedPoint.value?.nodeServer?.id,
    } as ZcashNodeServerApi.NodeServer);
    message.success($t('Stopped'));
    await reloadNodeInfo();
  } finally {
    hideLoading();
    operationInProgress.value = false;
  }
}

async function reloadNodeInfo() {
  send(
    JSON.stringify({
      command: 'getNodeInfo',
    }),
  );
}
</script>
<template>
  <div class="node-net">
    <Page auto-content-height @height-init="onHeightInit">
      <div class="dbip-logo">
        <a href="https://db-ip.com/db/download/ip-to-city-lite" target="_blank"><img src="https://db-ip.com//logo/ip-geolocation.png"
        /></a>
      </div>
      <div class="globeWrapper" ref="globeWrapperRef">
        <div v-if="heightInitialized" ref="globeRef" class="globe"></div>
        <BorderBox1 class="decoration d-borderbox">
          <Decoration7 class="d-top-center">
            <div class="block-height">
              <VbenCountToAnimator
                :end-val="blockHeight"
                :start-val="1"
                class="text-xl"
                prefix=""
              />
            </div>
          </Decoration7>
        </BorderBox1>
        <Decoration1 class="decoration d-top-right" />
        <Decoration8 class="decoration d-bottom-left" />
        <Decoration8 :reverse="true" class="decoration d-bottom-right" />
        <Decoration9 class="decoration d-top-left block-sync-percent">
          <VbenCountToAnimator
            :end-val="verificationprogress"
            :start-val="0"
            class="text-xl"
            prefix=""
          />%
        </Decoration9>
        <Decoration12 class="decoration d-radar" />
        <Decoration10 class="decoration d-top-line" />
        <BorderBox13
          class="decoration d-left-content"
          v-if="selectedPoint != null"
        >
          <div>
            <table class="server-info t-center w-full">
              <tbody>
                <tr>
                  <td>
                    <div>
                      <IconifyIcon
                        icon="carbon:close-filled"
                        @click="closeNodePanel"
                        style="cursor: pointer"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div>
                        <Decoration11 class="node-title">
                          {{ selectedPoint.name }}
                        </Decoration11>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Established Nodes</td>
                </tr>
                <tr>
                  <td>
                    <VbenCountToAnimator
                      :end-val="selectedPoint.nodeInfo?.peerInfos?.length || 0"
                      :start-val="0"
                      class="text-xl"
                      prefix=""
                    />
                  </td>
                </tr>
                <tr>
                  <td>Block Height</td>
                </tr>
                <tr>
                  <td>
                    <VbenCountToAnimator
                      :end-val="
                        selectedPoint.nodeInfo?.blockchaininfo
                          ?.estimatedheight || 0
                      "
                      :start-val="0"
                      class="text-xl"
                      prefix=""
                    />
                    <br />
                    <VbenCountToAnimator
                      :end-val="
                        selectedPoint.nodeInfo?.blockchaininfo?.blocks || 0
                      "
                      :start-val="0"
                      class="text-xs"
                      prefix=""
                    />
                  </td>
                </tr>
                <tr v-if="false">
                  <td>Blocks</td>
                </tr>
                <tr v-if="false">
                  <td>
                    <VbenCountToAnimator
                      :end-val="
                        selectedPoint.nodeInfo?.blockchaininfo?.blocks || 0
                      "
                      :start-val="0"
                      class="text-xl"
                      prefix=""
                    />
                  </td>
                </tr>
                <tr>
                  <td>Verification Progress</td>
                </tr>
                <tr>
                  <td>
                    <VbenCountToAnimator
                      :end-val="
                        displayVerificationProgress(
                          selectedPoint.nodeInfo?.blockchaininfo
                            ?.verificationprogress || 0,
                          4,
                        )
                      "
                      :start-val="0"
                      class="text-xl"
                      prefix=""
                      :decimals="2"
                    />%
                  </td>
                </tr>

                <tr>
                  <td>Size on Disk</td>
                </tr>
                <tr>
                  <td>
                    <VbenCountToAnimator
                      :end-val="
                        selectedPoint.nodeInfo?.blockchaininfo?.size_on_disk ||
                        0
                      "
                      :start-val="0"
                      class="text-xl"
                      prefix=""
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      class="node-operation-buttons"
                      style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div
                        class="d-inline"
                        @click="handleStartNode"
                        v-if="
                          selectedPoint != null &&
                          selectedPoint.nodeServer != null &&
                          selectedPoint.nodeServer.nodeStatus !== 'running'
                        "
                      >
                        <Decoration11
                          class="node-operation-button node-start-button"
                        >
                          <IconifyIcon
                            icon="carbon:play-filled-alt"
                            style="cursor: pointer"
                          />
                          Start
                        </Decoration11>
                      </div>
                      <div
                        class="d-inline"
                        @click="handleStopNode"
                        v-if="
                          selectedPoint != null &&
                          selectedPoint.nodeServer != null &&
                          selectedPoint.nodeServer.nodeStatus === 'running'
                        "
                      >
                        <Decoration11
                          class="node-operation-button node-stop-button"
                        >
                          <IconifyIcon icon="carbon:stop-filled-alt" />
                          Stop
                        </Decoration11>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BorderBox13>
      </div>
    </Page>
  </div>
</template>
<style lang="scss" scoped>
.node-net {
  :deep(.p-4) {
    padding: 1em;
  }
}
.border-box {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 15;
  left: 0;
  top: 0;
  pointer-events: none;
}
.globeWrapper {
  border-radius: 2em;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.decoration {
  z-index: 100;
  position: absolute;
}

.d-borderbox {
  left: 0;
  top: 0;
  pointer-events: none;
}

.d-top-right {
  right: 2em;
  top: 2em;
  width: 200px;
  height: 50px;
}
.d-top-center {
  margin: 2em auto;
  width: 150px;
  height: 30px;
}
.block-height {
  margin: 0 1em;
}
.d-bottom-left {
  width: 300px;
  height: 50px;
  bottom: 2em;
  left: 3em;
}
.d-bottom-right {
  width: 300px;
  height: 50px;
  bottom: 2em;
  right: 3em;
}
.d-top-left {
  top: 2em;
  left: 2em;
  width: 6em;
  height: 6em;
}
.d-radar {
  width: 150px;
  height: 150px;
  bottom: 6em;
  right: 8em;
}
.d-top-line {
  width: 100%;
  height: 5px;
  top: 0.4em;
}

.d-left-content {
  left: 5em;
  top: 10em;
  width: 15em;
  height: 29em;
  padding: 1em 1em 0 1em;
  color: #1dc1f5;
}
.node-title {
  width: 150px;
  height: 60px;
  color: white;
  font-weight: 900;
}
.d-inline {
  display: inline-block;

  .node-operation-button {
    width: 120px;
    height: 50px;
    cursor: pointer;
  }
  .node-start-button {
  }
  .node-stop-button {
  }
}

.t-center {
  text-align: center;
}

.dbip-logo {
  position: absolute;
  z-index: 100;
  top: 6em;
  right: 2em;
  pointer-events: unset;
}
</style>
