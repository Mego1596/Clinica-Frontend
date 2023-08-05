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
  appointment: {
    list: `${BASE}/appointment/`,
    create: `${BASE}/appointment/`,
    get: (id: number) => {
      return `${BASE}/appointment/${id}/`;
    },
    getAppointments: (viewStartDate: string, viewEndDate: string) => {
      return `${BASE}/appointment/get_appointments/?start_date=${viewStartDate}&end_date=${viewEndDate}`;
    },
    update: (id: number) => {
      return `${BASE}/appointment/${id}/`;
    },
    patch: (id: number) => {
      return `${BASE}/appointment/${id}/`;
    },
    delete: (id: number) => {
      return `${BASE}/appointment/${id}/`;
    },
  },
  payment: {
    list: `${BASE}/payment/`,
    create: `${BASE}/payment/`,
    get: (id: number) => {
      return `${BASE}/payment/${id}/`;
    },
    getPayments: (appointmentId: number) => {
      return `${BASE}/payment/get_payments/${appointmentId}`;
    },
    update: (id: number) => {
      return `${BASE}/payment/${id}/`;
    },
    delete: (id: number) => {
      return `${BASE}/payment/${id}/`;
    },
  },
  medicalPrescription: {
    list: `${BASE}/medical_prescription/`,
    create: `${BASE}/medical_prescription/`,
    get: (id: number) => {
      return `${BASE}/medical_prescription/${id}/`;
    },
    getMedicalPrescriptions: (appointmentId: number) => {
      return `${BASE}/medical_prescription/get_medical_prescriptions/${appointmentId}`;
    },
    update: (id: number) => {
      return `${BASE}/medical_prescription/${id}/`;
    },
    delete: (id: number) => {
      return `${BASE}/medical_prescription/${id}/`;
    },
  },
  prescriptionDetail: {
    list: `${BASE}/prescription_detail/`,
    create: `${BASE}/prescription_detail/`,
    get: (id: number) => {
      return `${BASE}/prescription_detail/${id}/`;
    },
    getPrescriptionDetails: (medicalPrescriptionId: number) => {
      return `${BASE}/prescription_detail/get_prescription_details/${medicalPrescriptionId}`;
    },
    update: (id: number) => {
      return `${BASE}/prescription_detail/${id}/`;
    },
    delete: (id: number) => {
      return `${BASE}/prescription_detail/${id}/`;
    },
  },
};
