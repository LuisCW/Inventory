const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const isValidEmail = (value: string): boolean => EMAIL_REGEX.test(value);

export const isStrongPassword = (value: string): boolean => PASSWORD_REGEX.test(value);
