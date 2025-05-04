import { environment } from '../../environments/environment';

export const apiConf = {
  apiUrl: environment.apiUrl,
  environment: environment.production ? 'production' : 'development',
  endpoints: {
    auth: {
      // Endpoints de autenticación
      login: '/auth/login',
      logout: '/auth/logout',
      resetPassword: '/auth/reset-password',
      register: '/auth/register',
      delete: (uid: string) => `/auth/${uid}`,
    },
    users: {
      profile: (uid: string) => `/users/profile/${uid}`,
      create: '/users',
      list: '/users',
    },
    games: {
      list: '/games',
      detail: (id: number) => `/games/${id}`,
      filterByCategory: (id: number) => `/games/category/${id}`,
      getUserGames: `/games/user`,
    },
    categories: {
      list: '/categories',
      detail: (id: number) => `/categories/${id}`,
    },
    community: {
      joinCommunity: `/community/join`,
      leaveCommunity: `/community/leave`,
      isMember: (uid: string, gameId: number) =>
        `/community/isMember?userId=${uid}&gameId=${gameId}`,
      getCommunitiesByUser: (uid: string) => `/community/${uid}`,
    },
  },
};

export const getApiUrl = (endpoint: string) => {
  const url = `${apiConf.apiUrl}${endpoint}`;
  console.log(`[${apiConf.environment}] Requesting:`, url);
  return url;
};
