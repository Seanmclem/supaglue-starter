export function humanizeAuthError(error: string): string {
    switch (error) {
        case "Invalid login credentials":
            return "Incorrect email or password";
        case "Email not confirmed":
            return "Please verify your email address before signing in";
        case "User already registered":
            return "An account with this email already exists";
        case "Password is too weak":
            return "Password must be stronger";
        case "Invalid email":
            return "Please enter a valid email address";
        default:
            return error || "An error occurred during sign in";
    }
}
