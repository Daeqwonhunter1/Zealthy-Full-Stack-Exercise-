import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client.js";


const adapter = new PrismaBetterSqlite3({
  url: "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

const users =  [
    {
        id: 1,
        name: "Mark Johnson",
        email: "mark@some-email-provider.net",
        password: "Password123!",
    },
    {
        id: 2,
        name: "Lisa Smith",
        email: "lisa@some-email-provider.net",
        password: "Password123!",
    }
]

const appointments = [
    {
        id: 1,
        provider: "Dr Kim West",
        datetime: "2026-02-16T16:30:00.000-07:00",
        repeat: "weekly",
        patientId: 1
    },
    {
        id: 2,
        provider: "Dr Lin James",
        datetime: "2026-02-19T18:30:00.000-07:00",
        repeat: "monthly",
        patientId: 1
    },
    {
        id: 3,
        provider: "Dr Sally Field",
        datetime: "2026-02-22T18:15:00.000-07:00",
        repeat: "monthly",
        patientId: 2
    },
    {
        id: 4,
        provider: "Dr Lin James",
        datetime: "2026-02-25T20:00:00.000-07:00",
        repeat: "weekly",
        patientId: 2
    }
]

const prescriptions = [
    {
        id: 1,
        medication: "Lexapro",
        dosage: "5mg",
        quantity: 2,
        refill_on: "2026-02-05",
        refill_schedule: "monthly",
        patientId: 1
    },
    {
        id: 2,
        medication: "Ozempic",
        dosage: "1mg",
        quantity: 1,
        refill_on: "2026-02-10",
        refill_schedule: "monthly",
        patientId: 1
    },
    {
        id: 3,
        medication: "Metformin",
        dosage: "500mg",
        quantity: 2,
        refill_on: "2026-02-15",
        refill_schedule: "monthly",
        patientId: 2
    },
    {
        id: 4,
        medication: "Diovan",
        dosage: "100mg",
        quantity: 1,
        refill_on: "2026-02-25",
        refill_schedule: "monthly",
        patientId: 2
    }
]


const medications = ["Diovan", "Lexapro", "Metformin", "Ozempic", "Prozac", "Seroquel", "Tegretol"]
const dosages = ["1mg", "2mg", "3mg", "5mg", "10mg", "25mg", "50mg", "100mg", "250mg", "500mg", "1000mg"]


export async function seedDb(){
    // Clear DB

    await prisma.appointment.deleteMany();
    await prisma.prescription.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.medication.deleteMany();
    await prisma.dosage.deleteMany();


    // Seed Medications
    for (const medication of medications) {
        await prisma.medication.create({
            data: { name: medication }
        })
    }

    // Seed dosages 
    for (const dosage of dosages) {
        await prisma.dosage.create({
            data: { value: dosage} 
        })
    }

    // Seed Users

    for (const user of users) {
        await prisma.patient.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
    }

    // Seed appointments

    for (const appt of appointments) {
        await prisma.appointment.create({
            data: {
                id: appt.id,
                patientId: appt.patientId,
                provider: appt.provider,
                datetime: new Date(appt.datetime),
                repeat: appt.repeat,
            },
        });
    }

    // Seed Prescriptions

    for (const rx of prescriptions) {
        await prisma.prescription.create({
            data: {
                id: rx.id,
                patientId: rx.patientId,
                medication: rx.medication,
                dosage: rx.dosage,
                quantity: rx.quantity,
                refillOn: new Date(rx.refill_on),
                refillSchedule: rx.refill_schedule,
            },
        });
    }

    console.log("Completed")
}


seedDb()
    .catch((e) => {
        console.error("Seed Failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    })