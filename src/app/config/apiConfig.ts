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
      logout: () => '/logout',
    }),
    category: createEndpointGroup('category', {
      listAll: () => '',
      findByCategoryName: (categoryName: string) => `/${categoryName}`,
    }),
    chats: createEndpointGroup('chats', {
      getChatMessages: (
        usernameToChat: string,
        offset: number,
        limit: number
      ) => `/messages/${usernameToChat}?offset=${offset}&limit=${limit}`,
    }),
    community: createEndpointGroup('community', {
      joinCommunity: () => '/join',
      leaveCommunity: () => '/leave',
      currentUserCommunities: (offset: number, limit: number) =>
        `/userLogged?offset=${offset}&limit=${limit}`,
      checkMembership: (gameName: string) => `/is-community-member/${gameName}`,
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
        cancel: () => '/cancel',
        accept: () => '/accept',
        reject: () => '/reject',
      }),
    }),
    user: createEndpointGroup('users', {
      friendShipRequests: (offset: number, limit: number) =>
        `/friend-request?offset=${offset}&limit=${limit}`,
      listAllNotFriends: (offset: number, limit: number) =>
        `?offset=${offset}&limit=${limit}`,
      findByUsername: (username: string) => `/user/${username}`,
      getProfile: (username: string) => `/${username}`,
      getCurrentUserLogged: () => '/me',
      getFriendsList: (offset: number, limit: number) =>
        `/friends?offset=${offset}&limit=${limit}`,
    }),
    posts: createEndpointGroup('posts', {
      create: () => '',
      findByCommunityName: (gameName: string, offset: number, limit: number) =>
        `/${gameName}?offset=${offset}&limit=${limit}`,
      toggleLike: (postId: string) => `/${postId}/toggle-like`,
      getUserFeed: (offset: number, limit: number) =>
        `/feed?offset=${offset}&limit=${limit}`,
    }),
    comments: createEndpointGroup('comments', {
      create: () => '',
      findByPostId: (postId: string, offset: number, limit: number) =>
        `/${postId}?offset=${offset}&limit=${limit}`,
      toggleLike: (commentId: string) => `/${commentId}/toggle-like`,
    }),
  },
} as const;

export const getApiUrl = (endpoint: string) => {
  const url = `${apiConf.apiUrl}${endpoint}`;
  console.log(`[${apiConf.environment}] Requesting:`, url);
  return url;
};
