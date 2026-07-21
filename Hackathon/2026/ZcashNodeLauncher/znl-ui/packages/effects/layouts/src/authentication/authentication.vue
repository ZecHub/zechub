<script setup lang="ts">
import type { ToolbarType } from './types';

import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

import { preferences, usePreferences } from '@vben/preferences';

import Globe from 'globe.gl';

import { Copyright } from '../basic/copyright';
import AuthenticationFormView from './form.vue';
import Toolbar from './toolbar.vue';

const props = withDefaults(defineProps<Props>(), {
  appName: '',
  copyright: true,
  logo: '',
  pageDescription: '',
  pageTitle: '',
  sloganImage: '',
  toolbar: true,
  toolbarList: () => ['color', 'language', 'layout', 'theme'],
  clickLogo: () => {},
  pointsData: () => [],
  arcsData: () => [],
});

interface Props {
  appName?: string;
  logo?: string;
  pageTitle?: string;
  pageDescription?: string;
  sloganImage?: string;
  toolbar?: boolean;
  copyright?: boolean;
  toolbarList?: ToolbarType[];
  clickLogo?: () => void;
  pointsData?: Array<any>;
  arcsData?: Array<any>;
}

const { authPanelCenter, authPanelLeft, authPanelRight, isDark } =
  usePreferences();

const OPACITY = 0.22;
const globeRef = ref<HTMLElement | null>(null);
const globeWrapperRef = ref<HTMLElement | null>(null);
let globeInstance: any = null;
onMounted(async () => {
  await nextTick();
  await initGlobe();
});
onUnmounted(() => {
  if (globeRef.value) {
    globeRef.value.innerHTML = '';
  }
  window.removeEventListener('resize', handleResize);
  globeInstance?._destructor();
});

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
    .pointOfView({ lat: 39.6, lng: -98.5, altitude: 3 }); // aim at continental US

  globeInstance
    .arcStartLat((d) => +d.startLat)
    .arcStartLng((d) => +d.startLng)
    .arcEndLat((d) => +d.endLat)
    .arcEndLng((d) => +d.endLng)
    .arcDashLength(0.25)
    .arcDashGap(1)
    .arcDashInitialGap(() => Math.random())
    .arcDashAnimateTime(4000)
    // .arcAltitude((d) => 0.2 * Math.random() + 0.1)
    .arcColor((d) => [
      `rgba(0, 255, 0, ${OPACITY})`,
      `rgba(255, 0, 0, ${OPACITY})`,
    ])
    .arcsTransitionDuration(0); //
  // .pointsMerge(true); //
  globeInstance
    .pointColor((d) => d.color || '#ffffff')
    .pointAltitude(0.001) //
    .pointRadius((d) => 0.2);

  window.addEventListener('resize', handleResize);
}

watch(
  () => props.pointsData,
  (v, old) => {
    globeInstance.pointsData(props.pointsData || []);
  },
);

watch(
  () => props.arcsData,
  (v, old) => {
    globeInstance.arcsData(props.arcsData || []);
  },
);

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
</script>

<template>
  <div
    :class="[isDark ? 'dark' : '']"
    class="flex min-h-full flex-1 select-none overflow-x-hidden"
  >
    <template v-if="toolbar">
      <slot name="toolbar">
        <Toolbar :toolbar-list="toolbarList" />
      </slot>
    </template>
    <AuthenticationFormView
      v-if="authPanelLeft"
      class="min-h-full w-2/5 flex-1"
      transition-name="slide-left"
    >
      <template v-if="copyright" #copyright>
        <slot name="copyright">
          <Copyright
            v-if="preferences.copyright.enable"
            v-bind="preferences.copyright"
          />
        </slot>
      </template>
    </AuthenticationFormView>

    <slot name="logo">
      <!-- Head Logo Application Name -->
      <div
        v-if="logo || appName"
        class="absolute left-0 top-0 z-10 flex flex-1"
        @click="clickLogo"
      >
        <div
          class="text-foreground lg:text-foreground ml-4 mt-4 flex flex-1 items-center sm:left-6 sm:top-6"
        >
          <img v-if="logo" :alt="appName" :src="logo" class="mr-2" width="42" />
          <p v-if="appName" class="m-0 text-xl font-medium">
            {{ appName }}
          </p>
        </div>
      </div>
    </slot>

    <!-- Introduction to the system -->
    <div v-if="!authPanelCenter" class="relative hidden w-0 flex-1 lg:block">
      <div class="globeTitle">
        <span>Well Come Back Hero</span>
        <br />
        <span>Never Sell Your Zcash Coin</span>
      </div>
      <div ref="globeWrapperRef" class="globeWrapperRef">
        <div ref="globeRef" class="globe"></div>
      </div>
    </div>

    <!-- Central Accreditation Panel -->
    <div v-if="authPanelCenter" class="flex-center relative w-full">
      <div class="login-background absolute left-0 top-0 size-full"></div>
      <AuthenticationFormView
        class="md:bg-background shadow-primary/5 shadow-float w-full rounded-3xl pb-20 md:w-2/3 lg:w-1/2 xl:w-[36%]"
      >
        <template v-if="copyright" #copyright>
          <slot name="copyright">
            <Copyright
              v-if="preferences.copyright.enable"
              v-bind="preferences.copyright"
            />
          </slot>
        </template>
      </AuthenticationFormView>
    </div>

    <AuthenticationFormView
      v-if="authPanelRight"
      class="min-h-full w-[34%] flex-1"
    >
      <template v-if="copyright" #copyright>
        <slot name="copyright">
          <Copyright
            v-if="preferences.copyright.enable"
            v-bind="preferences.copyright"
          />
        </slot>
      </template>
    </AuthenticationFormView>
  </div>
</template>

<style scoped>
.login-background {
  background: linear-gradient(
    154deg,
    #07070915 30%,
    hsl(var(--primary) / 30%) 48%,
    #07070915 64%
  );
  filter: blur(100px);
}

.dark {
  .login-background {
    background: linear-gradient(
      154deg,
      #07070915 30%,
      hsl(var(--primary) / 20%) 48%,
      #07070915 64%
    );
    filter: blur(100px);
  }
}
.globeWrapperRef {
  width: 100%;
  height: 100%;
}
.globeTitle {
  font-weight: 600;
  position: absolute;
  z-index: 10;
  margin: 0 auto;
  margin-top: 2em;
  width: 100%;
  text-align: center;
  span {
    color: #ff7e5f;
    background: linear-gradient(90deg, #ff7e5f, #feb47b, #ff7e5f);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    animation: hue-rotate-anim 5s linear infinite;
  }
}

@keyframes hue-rotate-anim {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
