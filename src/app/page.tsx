import { api } from "@/trpc/server";
import { PatientDashboard } from "@/components/PatientDashboard";

export default async function Home() {
  const patients = await api.patient.getPatients();

  return <PatientDashboard patients={patients} />;
}
