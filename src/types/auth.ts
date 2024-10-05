export interface User {
    id: string;
    fullName: string;
    userName: string;
}

export interface RegisterUser {
    id: string;
    fullName: string;
    userName: string;
    password: string;
    email: string;
}

export interface LoginUser {
    password: string;
    username: string;
}