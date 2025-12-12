export type AuthStackParamList = {
  Onboarding: undefined;
  UsageAccess: undefined;
};

export type AppStackParamList = {
  Dashboard: undefined;
  FocusSession: undefined;
  WeeklyInsights: undefined;
  AppRestrictions: undefined;
  Settings: undefined;
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;