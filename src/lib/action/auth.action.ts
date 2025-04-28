"use server";

import env from "@/env";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 7 days

export async function signUp(params:SignUpParams) {
  const { uid, email, name } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please log in.",
      }
    }
    
    await db.collection("users").doc(uid).set({
      name, email
    })

    return {
      success: true,
      message: "User created successfully",
    }
  } catch (err: any) {
    console.log("Error creating user: ", err)

    if (err.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "Email already in use",
      };
    }

    return {
      success: false,
      message: "Error creating user",
    }
  }
}


export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Create an account.",
      }
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "User logged in successfully",
    }
    
  } catch (error: any) {
    console.log("Error signing in user: ", error)

    return {
      success: false,
      message: "Failed to log into an account",
    }
    
  }
  
}


export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK
  })

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: env.nodeEnv === "production",
    path: "/",
    sameSite: "lax",
  })
}


export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db.collection("users").doc(decodedClaims.uid).get();
    if (!userRecord.exists) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id
    } as User;
    
  } catch (error) {
    console.log("Error getting current user: ", error)
    return null;
  }
}


export async function isAuthenticated() {
  const user = await getCurrentUser();
  
  return !!user;
}