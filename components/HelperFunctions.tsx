import { getPatientSessionId } from "@/lib/auth";
import { Patient } from "@/types";
import { db } from "@/lib/db";


//Helper function, transforms prisma results before returning 
function toPatientDTO(patient: any): Patient {
  return {
    id: patient.id,
    name: patient.name,
    email: patient.email,
    password: patient.password,
    appointments: patient.appointments.map((appt: any) => ({
      id: appt.id,
      provider: appt.provider,
      datetime: appt.datetime.toISOString(),
      repeat: appt.repeat,
      repeatEndsOn: appt.repeatEndsOn
        ? appt.repeatEndsOn.toISOString()
        : null,
    })),
    prescriptions: patient.prescriptions.map((rx: any) => ({
      id: rx.id,
      medication: rx.medication,
      dosage: rx.dosage,
      quantity: rx.quantity,
      refillOn: rx.refillOn.toISOString(),
      refillSchedule: rx.refillSchedule,
      refillEndsOn: rx.refillEndsOn
        ? rx.refillEndsOn.toISOString()
        : null,
    })),
  };
}

export async function getPatient(id: string): Promise<Patient> {
  const patientId = Number(id);

  if (!id || Number.isNaN(patientId)) {
    throw new Error("Invalid patient id");
  }

  const patient = await db.patient.findUnique({
    where: { id: patientId },
    include: {
      appointments: true,
      prescriptions: true,
    },
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  return toPatientDTO(patient);
}

export async function getPatients(): Promise<Patient[]> {
  const patients = await db.patient.findMany({
    include: {
      appointments: true,
      prescriptions: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return patients.map(toPatientDTO);
}

export async function getRxOptions() {
  const medications = await db.medication.findMany({
    orderBy: { name: "asc" },
  });

  const dosages = await db.dosage.findMany({
    orderBy: { value: "asc" },
  });

  return {
    medications,
    dosages,
  };
}

export async function getLoggedInPatient() {
  const patientId = await getPatientSessionId();

  if (!patientId) {
    return null;
  }

  const patient = await db.patient.findUnique({
    where: { id: patientId },
    include: {
      appointments: true,
      prescriptions: true,
    },
  });

  if (!patient) {
    return null;
  }

  return toPatientDTO(patient);
}

export async function getPatientsFromDb(): Promise<Patient[]> {
  const patients = await db.patient.findMany({
    include: {
      appointments: true,
      prescriptions: true,
    },
    orderBy: { id: "asc" },
  });

  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    email: patient.email,
    password: patient.password,
    appointments: patient.appointments.map((appt) => ({
      id: appt.id,
      provider: appt.provider,
      datetime: appt.datetime.toISOString(),
      repeat: appt.repeat,
      repeatEndsOn: appt.repeatEndsOn
        ? appt.repeatEndsOn.toISOString()
        : null,
    })),
    prescriptions: patient.prescriptions.map((rx) => ({
      id: rx.id,
      medication: rx.medication,
      dosage: rx.dosage,
      quantity: rx.quantity,
      refillOn: rx.refillOn.toISOString(),
      refillSchedule: rx.refillSchedule,
      refillEndsOn: rx.refillEndsOn
        ? rx.refillEndsOn.toISOString()
        : null,
    })),
  }));
}



export async function getPatientFromDb(id: string): Promise<Patient> {
  const patientId = Number(id);

  if (!id || Number.isNaN(patientId)) {
    throw new Error("Invalid patient id");
  }

  const patient = await db.patient.findUnique({
    where: { id: patientId },
    include: {
      appointments: true,
      prescriptions: true,
    },
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  return {
    id: patient.id,
    name: patient.name,
    email: patient.email,
    password: patient.password,
    appointments: patient.appointments.map((appt) => ({
      id: appt.id,
      provider: appt.provider,
      datetime: appt.datetime.toISOString(),
      repeat: appt.repeat,
      repeatEndsOn: appt.repeatEndsOn
        ? appt.repeatEndsOn.toISOString()
        : null,
    })),
    prescriptions: patient.prescriptions.map((rx) => ({
      id: rx.id,
      medication: rx.medication,
      dosage: rx.dosage,
      quantity: rx.quantity,
      refillOn: rx.refillOn.toISOString(),
      refillSchedule: rx.refillSchedule,
      refillEndsOn: rx.refillEndsOn
        ? rx.refillEndsOn.toISOString()
        : null,
    })),
  };
}