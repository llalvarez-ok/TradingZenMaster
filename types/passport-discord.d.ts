declare module 'passport-discord' {
  import { Strategy as PassportStrategy } from 'passport';
  
  export interface Profile {
    id: string;
    username: string;
    email?: string;
    discriminator: string;
    avatar?: string;
    provider: string;
    accessToken: string;
    refreshToken: string;
    fetchedAt: Date;
  }
  
  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: string[];
    passReqToCallback?: boolean;
  }
  
  export type VerifyCallback = (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => void;
  
  export class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyCallback);
    name: string;
    authenticate(req: any, options?: any): void;
  }
}