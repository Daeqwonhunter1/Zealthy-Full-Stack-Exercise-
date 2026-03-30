export type Appointment = {
  id: number;
  provider: string;
  datetime: string;
  repeat: string;
}
export type Prescription = {
  id: number;
  medication: string;
  dosage: string;
  quantity: number;
  refillOn: string;
  refillSchedule: string;
}
export type Patient = {
  id: number;
  name: string;
  email: string;
  password: string;
  appointments: Appointment[];
  prescriptions: Prescription[];
}

export type PatientCardProps = {
  patient: Patient
}

export type LoginResponse = {
  success: boolean;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  message?: string;
};

export type PatientTableProps = {
  patients: Patient[];
};

export type PatientIdProps = {
  patientId: string;
};

export type PatientNameProps = {
  patientName: string;
}
export type AppointmentFormProps = {
  appointment: {
    id: number;
    patientId: number;
    provider: string;
    datetime: string;
    repeat: string;
    repeatEndsOn?: string | null;
  };
};


export type PrescriptionFormProps = {
  prescription: {
    id: number;
    patientId: number;
    medication: string;
    dosage: string;
    quantity: number;
    refillOn: string;
    refillSchedule: string;
    refillEndsOn?: string | null;
  };
  medications: Medication[];
  dosages: Dosage[]
};

export type RxOptions = {
  id: number;
  name?: string;
  value?: string;
}

export type Dosage = {
  id: number;
  value: string;
}

export type Medication = {
  id: number;
  name: string;
}

export type RxProps = {
  patientId: string;
  medications: Medication[];
  dosages: Dosage[];
}

export type PortalSidebarProps = {
  active: "portal" | "appointments" | "prescriptions";
};
