// src/custom.d.ts
declare module 'express' {
  export interface Request {
    user?: { userId: string };
  }
}
