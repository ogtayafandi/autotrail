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

export interface SignedUser {
    id: string
    name: string
    username: string
    email: string
    createdAt: string
    updatedAt: string
}