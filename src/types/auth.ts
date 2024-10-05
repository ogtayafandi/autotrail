export interface User {
    token: string;
    user: {
        id: string;
        name: string;
        username: string;
    }
}

export interface RegisterUser {
    id: string;
    name: string;
    username: string;
    password: string;
    email: string;
}

export interface LoginUser {
    password: string;
    username: string;
}