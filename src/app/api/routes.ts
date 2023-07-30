const BASE = 'https://mego1596.pythonanywhere.com/';
export const ROUTES = {
  authentication: {
    login: `${BASE}/login/`,
    refresh: `${BASE}/refresh/`,
  },
  group: {
    list: `${BASE}/group/`,
    getGroups: (
      includeGroups?: Array<string>,
      excludeGroups?: Array<string>
    ) => {
      if (includeGroups) {
        let queryParams = '';
        for (const group of includeGroups) {
          queryParams += `include_groups=${group}&`;
        }
        return `${BASE}/group/get_groups/?${queryParams}`;
      }

      if (excludeGroups) {
        let queryParams = '';
        for (const group of excludeGroups) {
          queryParams += `exclude_groups=${group}`;
        }
        return `${BASE}/group/get_groups/?${queryParams}`;
      }

      return `${BASE}/group/get_groups/`;
    },
  },
};
