import type { SessionUser } from "@domain/identity/model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}

export {};
