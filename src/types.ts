export type JwtPayload = {
  email: string;
  userId: string;
  profileId: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
