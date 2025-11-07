export type RoutePath =
  | '/'
  | '/booking'
  | '/booking/patient-select'
  | '/booking/patient-add'
  | '/booking/institution-select'
  | '/booking/specialization-select'
  | '/booking/doctor-select'
  | '/booking/time-select'
  | '/booking/confirm'
  | '/booking/success'
  | '/profile'
  | '/settings'
  | '/404';

export interface RouteConfig {
  path: RoutePath;
  component: React.ComponentType;
  title: string;
  requiresAuth?: boolean;
  showBackButton?: boolean;
}
