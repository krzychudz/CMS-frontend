export const getRegisterError = errorCode => {
    if (errorCode === "auth/email-already-in-use") return "Podany email jest zajęty";
    return "Coś poszło nie tak. Spróbuj ponownie";
}