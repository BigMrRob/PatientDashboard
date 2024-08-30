import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

const HealthMetricSchema = z.object({
  value: z.number(),
  levels: z.string(),
});

const DiagnosisHistorySchema = z.object({
  month: z.string(),
  year: z.number(),
  blood_pressure: z.object({
    systolic: HealthMetricSchema,
    diastolic: HealthMetricSchema,
  }),
  heart_rate: HealthMetricSchema,
  respiratory_rate: HealthMetricSchema,
  temperature: HealthMetricSchema,
});

const PatientDataSchema = z.object({
  name: z.string(),
  gender: z.string(),
  age: z.number(),
  profile_picture: z.string(),
  date_of_birth: z.string(),
  phone_number: z.string(),
  emergency_contact: z.string(),
  insurance_type: z.string(),
  diagnosis_history: z.array(DiagnosisHistorySchema),
  diagnostic_list: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      status: z.string(),
    }),
  ),
  lab_results: z.array(z.string()),
});

const PatientDataArraySchema = z.array(PatientDataSchema);

export type PatientData = z.infer<typeof PatientDataSchema>;
export type PatientDataArray = z.infer<typeof PatientDataArraySchema>;

export const patientRouter = createTRPCRouter({
  getPatients: publicProcedure.query(async (): Promise<PatientDataArray> => {
    try {
      const response = await fetch(
        "https://fedskillstest.coalitiontechnologies.workers.dev",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${env.USERNAME}:${env.PASSWORD}`)}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();
      const validatedData = PatientDataArraySchema.parse(rawData);
      return validatedData;
    } catch (error) {
      console.error("Failed to fetch patients:", error);
      throw new Error("Failed to fetch patients. Please try again later.");
    }
  }),
});
