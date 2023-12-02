import { SessionOptions } from "iron-session";

export interface SessionData {
  email: string;
  isLoggedIn: boolean;
  roles?: string[];
  accessToken?: string;
  accessTokenExpireDate?: number;
  refreshToken?: string;
}

export const defaultSession: SessionData = {
  email: "Anonymous",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "__Host_user_session",
  cookieOptions: {
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
  },
};
