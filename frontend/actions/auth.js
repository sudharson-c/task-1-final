"use server";
import { cookies } from "next/headers";

export async function login(userData, token) {
    const cookieStore = cookies();
    cookieStore.set("user", JSON.stringify(userData), { path: "/", httpOnly: false });
    cookieStore.set("token", token, { path: "/", httpOnly: true });
}

export async function logout() {
    const cookieStore = cookies();
    cookieStore.delete("user");
    cookieStore.delete("token");
}

export async function getUser() {
    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");
    return userCookie ? JSON.parse(userCookie.value) : null;
}
