const API_URL_AUTH = 'http://localhost:3000/auth/login';

export const login = async (email: string, password: string) => {
    const res = await fetch(API_URL_AUTH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Invalid email or password");
    }

    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);
    return data;
};
