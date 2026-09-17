export const en = {
  appName: "Client portal",
  login: {
    kicker: "Helfenstein Asset Management",
    title: "Sign in",
    subtitle: "Use your credentials to open the client portal.",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    noAccount: "Need an account?",
    signupLink: "Create one",
    error: "Invalid email or password.",
  },
  signup: {
    kicker: "New access",
    title: "Create account",
    subtitle: "Register with your name, email, and a password of at least eight characters.",
    name: "Full name",
    email: "Email",
    password: "Password",
    submit: "Create account",
    hasAccount: "Already registered?",
    loginLink: "Sign in",
    error: "This account could not be created.",
  },
  app: {
    title: "Home",
    greeting: "Welcome, {name}.",
    body: "This is the start of the workspace. Further tools will appear here.",
    logout: "Sign out",
  },
};

export type Messages = typeof en;
