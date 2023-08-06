export type AuthResponse = {
  success: boolean;
  message: string;
  authUserId: number | null;
  authUserEmail: string | null;
};
