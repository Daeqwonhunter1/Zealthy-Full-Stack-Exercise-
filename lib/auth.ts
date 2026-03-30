import { cookies } from "next/headers";

const COOKIE_NAME = "patientId";

export async function setPatientSession(patientId: number) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, String(patientId), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });
}

export async function clearPatientSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getPatientSessionId() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;

  if (!value) return null;

  const patientId = Number(value);

  if (Number.isNaN(patientId)) return null;

  return patientId;
}