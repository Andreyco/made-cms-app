export interface User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    avatar: string | null;
    language: "sk" | "en" | null;
}

export type SessionUser = Pick<
    User,
    "firstName" | "lastName" | "email" | "id" | "avatar" | "language"
>;
