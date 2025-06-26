import { environment } from '../../environments/environment';

type Endpoint = string | ((...args: any[]) => string);
interface EndpointGroup {
  [key: string]: Endpoint | EndpointGroup;
}

function createEndpointGroup<T extends EndpointGroup>(
  basePath: string,
  endpoints: T
): T {
  const resolve = (value: Endpoint | EndpointGroup): any => {
    if (typeof value === 'function') {
      return (...args: any[]) =>
        `${basePath}${(value as (...args: any[]) => string)(...args)}`;
    } else if (typeof value === 'object') {
      return createEndpointGroup(basePath, value as EndpointGroup);
    } else {
      return `${basePath}${value}`;
    }
  };

  const result: any = {};
  for (const key in endpoints) {
    result[key] = resolve(endpoints[key]);
  }
  return result;
}

export const apiConf = {
  apiUrl: environment.apiUrl,
  environment: environment.production ? 'production' : 'development',
  endpoints: {
    accounts: createEndpointGroup('accounts', {
      register: () => '/register',
    }),
    auth: createEndpointGroup('auth', {
      login: () => '/login',
    }),
    category: createEndpointGroup('category', {
      listAll: () => '',
      findByCategoryName: (categoryName: string) => `/${categoryName}`,
    }),
    chats: createEndpointGroup('chats', {
      findAllMessagesByChatId: (chatId: string) => `/${chatId}/messages`,
    }),
    community: createEndpointGroup('community', {
      joinCommunity: () => '/join',
      leaveCommunity: () => '/leave',
      currentUserCommunities: (offset: number, limit: number) =>
        `/userLogged?offset=${offset}&limit=${limit}`,
    }),
    game: createEndpointGroup('games', {
      listAll: () => '',
      findById: (gameId: number) => `/${gameId}`,
      findByName: (gameName: string) => `/${gameName}`, //falta realizar
      findAllByCategoryName: (categoryName: string) =>
        `/category/${categoryName}`,
      insert: () => '',
    }),
    social: createEndpointGroup('social', {
      friendRequest: createEndpointGroup('/friend-request', {
        send: () => '/send',
        accept: () => '/accept',
        reject: () => '/reject',
      }),
    }),
    user: createEndpointGroup('users', {
      findByUsername: (username: string) => `/${username}`,
      getCurrentUserLogged: () => '/me',
      getFriendsList: (offset: number, limit: number) =>
        `/friends?offset=${offset}&limit=${limit}`,
    }),
  },
} as const;

export const getApiUrl = (endpoint: string) => {
  const url = `${apiConf.apiUrl}${endpoint}`;
  console.log(`[${apiConf.environment}] Requesting:`, url);
  return url;
};
