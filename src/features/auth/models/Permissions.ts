// Espelho de SystemPermissions de backend\app\shared\rbac\permissions.py
export const Permissions = {
  // Atestados
  CERTIFICATES_REVIEW: "certificates:review", // approve/reject
  CERTIFICATES_SUBMIT: "certificates:submit",
  CERTIFICATES_VALIDATE: "certificates:validate",

  // Atrasos
  DELAYS_CREATE: "delays:create",
  DELAYS_REVIEW: "delays:review", // approve/reject
  DELAYS_VIEW_ALL: "delays:read_all", // Todos os atrasos do sistema
  DELAYS_VIEW_CHILD: "delays:read_child", // Atrasos do(s) filho(s)
  DELAYS_VIEW_OWN: "delays:read_own", // Meus próprios atrasos
  DELAYS_VIEW_OWN_CLASSROOM: "delays:read_own_classroom", // Atrasos da minha turma (DT)

  // Espaços
  SPACES_MANAGE: "spaces:manage", // create, edit, delete
  SPACES_RESERVATE: "spaces:reservate",
  SPACES_VIEW_ALL: "spaces:read_all",

  // Horários
  SCHEDULES_MANAGE: "schedules:manage", // create, edit, delete
  SCHEDULES_VIEW_OWN: "schedules:read_own", // Minha turma / meu contexto
  SCHEDULES_VIEW_CHILD: "schedules:read_child", // Turma(s) do(s) filho(s)
  SCHEDULES_VIEW_ALL: "schedules:read_all", // Acesso amplo

  // Mídias
  MEDIAS_MANAGE: "medias:manage", // create, edit, delete
  MEDIAS_RESERVATE: "medias:reservate",
  MEDIAS_VIEW_ALL: "medias:read_all",

  // Ocorrências
  OCCURRENCES_CREATE: "occurrences:create",
  OCCURRENCES_DELETE: "occurrences:delete",
  OCCURRENCES_EDIT: "occurrences:update",
  OCCURRENCES_VIEW_ALL: "occurrences:read_all",
  OCCURRENCES_VIEW_CHILD: "occurrences:read_child",
  OCCURRENCES_VIEW_OWN: "occurrences:read_own",
  OCCURRENCES_VIEW_OWN_CLASSROOM: "occurrences:read_own_classroom",

  // Relatórios
  REPORTS_VIEW_ALL: "reports:view_all",
  REPORTS_VIEW_OWN_CLASSROOM: "reports:view_own_classroom",

  // Sugestões
  SUGGESTIONS_MODERATE: "suggestions:moderate",
  SUGGESTIONS_SUBMIT: "suggestions:submit",

  // Usuários
  USER_CHANGE_ROLE: "users:change_role",
  USER_CREATE: "users:create",
  USER_DELETE: "users:delete",
  USER_EDIT: "users:update",
  USER_EDIT_OWN_CLASSROOM: "users:update_own_classroom",
  USER_VIEW_ALL: "users:read_all",
  USER_VIEW_CHILD: "users:read_child",
  USER_VIEW_OWN: "users:read_own",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];
