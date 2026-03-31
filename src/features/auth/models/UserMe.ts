export type UserRole =
  | "student"
  | "guardian"
  | "teacher"
  | "coordinator"
  | "porter"
  | "admin";

export interface UserMe {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_tutor: boolean;
  is_active: boolean;
  classroom_id: number | null;
  must_change_password: boolean;
}

export interface UserPermissions {
  permissions: string[];
}
