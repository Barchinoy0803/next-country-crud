import { LoginForm, OTPVerification, RegisterForm } from "../types";

const base_url = 'https://keldibekov.online/'

export const sendOtp = async(email: string) => {
    const res = await fetch(`${base_url}auth/send-otp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    return res.json()
}

export const verifyOtp = async(body: OTPVerification) => {
    const res = await fetch(`${base_url}auth/verify-otp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return res.json()
}

export const registerUser = async(body: RegisterForm) => {
    const res = await fetch(`${base_url}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return res.json()
}

export const login = async(body: LoginForm) => {
    const res = await fetch(`${base_url}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return res.json()
}