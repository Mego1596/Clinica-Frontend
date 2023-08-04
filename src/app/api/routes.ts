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
  user: {
    list: `${BASE}/user/`,
    create: `${BASE}/user/`,
    get: (id: number) => {
      return `${BASE}/user/${id}/`;
    },
    update: (id: number) => {
      return `${BASE}/user/${id}/`;
    },
    delete: (id: number) => {
      return `${BASE}/user/${id}/`;
    },
  },
  doctor: {
    list: `${BASE}/doctor/`,
    create: `${BASE}/doctor/`,
    get: (id: number) => {
      return `${BASE}/doctor/${id}/`;
    },
    getDoctors: `${BASE}/doctor/get_doctors/`,
    update: (id: number) => {
      return `${BASE}/doctor/${id}/`;
    },
    delete: (id: number) => {
      return `${BASE}/doctor/${id}/`;
    },
  },
  patient: {
    list: `${BASE}/patient/`,
    create: `${BASE}/patient/`,
    get: (id: number) => {
      return `${BASE}/patient/${id}/`;
    },
    update: (id: number) => {
      return `${BASE}/patient/${id}/`;
    },
  },
  procedure: {
    list: `${BASE}/procedure/`,
    create: `${BASE}/procedure/`,
    get: (id: number) => {
      return `${BASE}/procedure/${id}/`;
    },
    getProcedures: `${BASE}/procedure/get_procedures`,
    update: (id: number) => {
      return `${BASE}/procedure/${id}/`;
    },
    delete: (id: number) => {
      return `${BASE}/procedure/${id}/`;
    },
  },
  treatmentPlan: {
    list: `${BASE}/treatment_plan/`,
    create: `${BASE}/treatment_plan/`,
    get: (id: number) => {
      return `${BASE}/treatment_plan/${id}/`;
    },
    getTreatmentPlans: (patientId: string) => {
      return `${BASE}/treatment_plan/get_treatment_plans/${patientId}`;
    },
    getTreatmentPlan: (patientId: string) => {
      return `${BASE}/treatment_plan/get_active_treatment_plan/${patientId}`;
    },
    update: (id: number) => {
      return `${BASE}/treatment_plan/${id}/`;
    },
    delete: (id: number) => {
      return `${BASE}/treatment_plan/${id}/`;
    },
  },
};
