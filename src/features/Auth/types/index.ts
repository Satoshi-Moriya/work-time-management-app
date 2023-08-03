export type AuthResponse<T> = {
  success: boolean;
  message: string;
  authUserData: T | null;
};

export type AuthUserData = {
  userId: number;
  userEmail: string;
};
