import { Role } from '@prisma/client';

export type JwtPayload = {
  email: string;
  userId: string;
  profileId: string;
  role: Role;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
