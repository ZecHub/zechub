<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { AuthenticationAuthTitle, VbenButton } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { authorize, getAuthorize } from '#/api/system/oauth2/open';

defineOptions({ name: 'SSOLogin' });

const { query } = useRoute();

const client = ref({
  name: '',
  logo: '',
}); // Client Information

const queryParams = reactive({
  responseType: '',
  clientId: '',
  redirectUri: '',
  state: '',
  scopes: [] as string[], // Get priority from query parameters; if not passed, get from backend
}); // Parameters such as clit_id, scope on URL

const loading = ref(false); // Submission of form in progress

/** Initialize enabling information */
async function init() {
  // Prevent the recycling of windows without login
  if (query.client_id === undefined) {
    return;
  }
  queryParams.responseType = query.response_type as string;
  queryParams.clientId = query.client_id as string;
  queryParams.redirectUri = query.redirect_uri as string;
  queryParams.state = query.state as string;
  if (query.scope) {
    queryParams.scopes = (query.scope as string).split(' ');
  }

  // If there are scope parameters, execute automatic authorizations once to see if they have been previously authorized.
  if (queryParams.scopes.length > 0) {
    const data = await doAuthorize(true, queryParams.scopes, []);
    if (data) {
      location.href = data;
      return;
    }
  }

  // 1.1 Access to basic information on authorized pages
  const data = await getAuthorize(queryParams.clientId);
  client.value = data.client;
  // 1.2 Parsing scope
  let scopes;
  // Filter returned scopes if params.scope is not empty
  if (queryParams.scopes.length > 0) {
    scopes = data.scopes.filter((scope) =>
      queryParams.scopes.includes(scope.key),
    );
    // Set it with returned scopes if the paraams. shop is empty
  } else {
    scopes = data.scopes;
    queryParams.scopes = scopes.map((scope) => scope.key);
  }

  // 2. Set the initial value of the form
  formApi.setFieldValue(
    'scopes',
    scopes.filter((scope) => scope.value).map((scope) => scope.key),
  );
}

/** Processing of delegation of authority submissions */
async function handleSubmit(approved: boolean) {
  // Compute checkedScopes + uncheckedScopes
  let checkedScopes: string[];
  let uncheckedScopes: string[];
  if (approved) {
    // Grant authority, according to the user's choice
    const res = await formApi.getValues();
    checkedScopes = res.scopes;
    uncheckedScopes = queryParams.scopes.filter(
      (item) => !checkedScopes.includes(item),
    );
  } else {
    // If you refuse, it's all cancelled.
    checkedScopes = [];
    uncheckedScopes = queryParams.scopes;
  }

  // Request for authorization
  loading.value = true;
  try {
    const data = await doAuthorize(false, checkedScopes, uncheckedScopes);
    if (!data) {
      return;
    }
    // Go back to the address after the jump authorization has been successful.
    location.href = data;
  } finally {
    loading.value = false;
  }
}

/** Call authorization API interface */
const doAuthorize = (
  autoApprove: boolean,
  checkedScopes: string[],
  uncheckedScopes: string[],
) => {
  return authorize(
    queryParams.responseType,
    queryParams.clientId,
    queryParams.redirectUri,
    queryParams.state,
    autoApprove,
    checkedScopes,
    uncheckedScopes,
  );
};

/** Format Scope Text */
function formatScope(scope: string) {
  // Formats the scope of the scope authorization, which is easy for users to understand.
  // This is just a demo, and you can consider entering the dictionary data, for example, the dictionary type "system_auth2_scope", each of which is a dictionary data.
  switch (scope) {
    case 'user.read': {
      return 'Access your personal information.';
    }
    case 'user.write': {
      return 'Modify your personal information';
    }
    default: {
      return scope;
    }
  }
}

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      fieldName: 'scopes',
      label: 'Scope of the mandate',
      component: 'CheckboxGroup',
      componentProps: {
        options: queryParams.scopes.map((scope) => ({
          label: formatScope(scope),
          value: scope,
        })),
        class: 'flex flex-col gap-2',
      },
    },
  ];
});

const [Form, formApi] = useVbenForm(
  reactive({
    commonConfig: {
      hideLabel: true,
      hideRequiredMark: true,
    },
    schema: formSchema,
    showDefaultActions: false,
  }),
);

/** Initialization */
onMounted(() => {
  init();
});
</script>

<template>
  <div @keydown.enter.prevent="handleSubmit(true)">
    <AuthenticationAuthTitle>
      <slot name="title">
        {{ `${client.name} 👋🏻` }}
      </slot>
      <template #desc>
        <span class="text-muted-foreground">
          This third party applies the request to obtain the following privileges:：
        </span>
      </template>
    </AuthenticationAuthTitle>

    <Form />

    <div class="flex gap-2">
      <VbenButton
        :class="{
          'cursor-wait': loading,
        }"
        :loading="loading"
        aria-label="login"
        class="w-2/3"
        @click="handleSubmit(true)"
      >
        Permission granted.
      </VbenButton>
      <VbenButton
        :class="{
          'cursor-wait': loading,
        }"
        :loading="loading"
        aria-label="login"
        class="w-1/3"
        variant="outline"
        @click="handleSubmit(false)"
      >
        Reject
      </VbenButton>
    </div>
  </div>
</template>