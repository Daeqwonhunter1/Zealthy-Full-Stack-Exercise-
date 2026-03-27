export type Patient = {
    id: number;
    name: string;
    email: string;
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