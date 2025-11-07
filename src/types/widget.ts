export interface RoleContext {
  [key: string]: {
    idMPI: string;
    idIP: string;
  };
}

export interface FormData {
  serviceRequest?: {
    reasonCode?: string;
    complaints?: string;
    urgency?: string;
    performerOrganization?: string;
    ageCategory?: string;
    REGIZ?: {
      iemk?: string;
      uo?: string;
      odii?: string;
      odli?: string;
    };
    healthCareService?: string;
    typeOfServiceProvision?: string;
    nomenclatureOfMedicalServices?: string;
  };
  context?: {
    serviceRequest?: {
      category?: string;
    };
  };
}

export interface WidgetConfig {
  workflowId?: string;
  transitionId?: string;
  roleContext: RoleContext;
  formData?: FormData;
  hideCreateButton?: boolean;
}

export interface AuthData {
  userId: string;
  authToken: string;
  sessionId?: string;
}