// Espelho de SystemPermissions de backend\app\shared\rbac\permissions.py
export const Permissions = {
  // Atrasos
  DELAYS_CREATE: "delays:create",
  DELAYS_APPROVE: "delays:approve",
  DELAYS_REJECT: "delays:reject",
  DELAYS_VIEW_ALL: "delays:read_all",
  DELAYS_VIEW_OWN: "delays:read_own",
  DELAYS_VIEW_CHILD: "delays:read_child",
  DELAYS_VIEW_OWN_CLASS: "delays:read_own_class",

  // Ocorrências
  OCCURRENCES_CREATE: "occurrences:create",
  OCCURRENCES_VIEW_ALL: "occurrences:read_all",
  OCCURRENCES_VIEW_OWN: "occurrences:read_own",
  OCCURRENCES_VIEW_CHILD: "occurrences:read_child",

  // Horários
  SCHEDULES_VIEW: "schedules:view",
  SCHEDULES_MANAGE: "schedules:manage",

  // Usuários
  USER_VIEW_ALL: "users:read_all",
  USER_CREATE: "user:create",
  USER_EDIT: "user:update",
  USER_DELETE: "user:delete",
  USER_CHANGE_ROLE: "user:change_role",

  // Relatórios
  REPORTS_VIEW_ALL: "reports:view_all",
  REPORTS_VIEW_OWN_CLASS: "reports:view_own_class",

  // Espaços
  SPACES_VIEW_ALL: "spaces:read_all",
  SPACES_RESERVATE: "spaces:reservate",
  SPACES_MANAGE: "spaces:manage", // create + edit + delete

  // Sugestões
  SUGGESTIONS_SUBMIT: "suggestions:submit",
  SUGGESTIONS_MODERATE: "suggestions:moderate",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];
