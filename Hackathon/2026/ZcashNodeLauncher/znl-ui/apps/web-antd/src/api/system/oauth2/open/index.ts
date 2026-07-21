import { requestClient } from '#/api/request';

/** OAuth 2.0 Authorisation Information Response */
export namespace SystemOAuth2ClientApi {
  /** Can not open message */
  export interface AuthorizeInfoRespVO {
    client: {
      logo: string;
      name: string;
    };
    scopes: {
      key: string;
      value: boolean;
    }[];
  }
}

/** Can not open message */
export function getAuthorize(clientId: string) {
  return requestClient.get<SystemOAuth2ClientApi.AuthorizeInfoRespVO>(
    `/system/oauth2/authorize?clientId=${clientId}`,
  );
}

/** Initiating authorization */
export function authorize(
  responseType: string,
  clientId: string,
  redirectUri: string,
  state: string,
  autoApprove: boolean,
  checkedScopes: string[],
  uncheckedScopes: string[],
) {
  // Build scopes
  const scopes: Record<string, boolean> = {};
  for (const scope of checkedScopes) {
    scopes[scope] = true;
  }
  for (const scope of uncheckedScopes) {
    scopes[scope] = false;
  }

  // Launch request
  return requestClient.post<string>('/system/oauth2/authorize', null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      response_type: responseType,
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
      auto_approve: autoApprove,
      scope: JSON.stringify(scopes),
    },
  });
}