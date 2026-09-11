declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      role?: string;
    };
  }

  interface NextAuthOptions {
    providers: unknown[];
    pages?: Record<string, string>;
    session?: { strategy: string };
    secret?: string;
  }

  interface NextAuthHandler {
    handler: (req: Request) => Promise<Response>;
  }

  function NextAuth(req: Request, options: NextAuthOptions): NextAuthHandler;
  export default NextAuth;
}

declare module 'next-auth/react' {
  export function signIn(
    provider?: string,
    options?: Record<string, unknown>,
    authorizationParams?: Record<string, unknown>
  ): Promise<void>;
  export function signOut(options?: Record<string, unknown>): Promise<void>;
  export function getSession(): Promise<Session | null>;
}

declare module 'next-auth/providers/github' {
  const Github: (options?: Record<string, unknown>) => unknown;
  export default Github;
}

declare module 'next-auth/providers/google' {
  const Google: (options?: Record<string, unknown>) => unknown;
  export default Google;
}

declare module 'next-auth/providers/credentials' {
  interface CredentialsConfig {
    name?: string;
    credentials?: Record<string, { label: string; type: string; placeholder?: string }>;
    authorize?: (credentials: Record<string, string | undefined>) => Promise<Record<string, unknown> | null>;
  }
  const Credentials: (options: CredentialsConfig) => unknown;
  export default Credentials;
}
