"use client";

import { PatientSidebar } from "@/components/PatientSidebar";
import { DiagnosisHistory } from "@/components/DiagnosisHistory";
import { DiagnosticList } from "@/components/DiagnosticList";
import { PatientDetails } from "@/components/PatientDetails";
import { LabResults } from "@/components/LabResults";
import { usePatientData } from "@/hooks/usePatientData";
import { PatientData } from "@/types/patient";

export function PatientDashboard({ patients }: { patients: PatientData[] }) {
  const {
    selectedPatient,
    onSelectPatient,
    recentRespiratoryRate,
    recentHeartRate,
    recentTemperature,
  } = usePatientData(patients);

  return (
    <main className="flex h-[calc(100vh-2rem)] gap-3 px-5">
      <PatientSidebar
        patients={patients}
        selectedPatient={selectedPatient}
        onSelectPatient={onSelectPatient}
      />
      <div className="flex flex-1 gap-3">
        <div className="flex flex-[3.5] flex-col gap-3">
          {selectedPatient && (
            <>
              <DiagnosisHistory
                diagnosisHistory={selectedPatient.diagnosis_history}
                recentRespiratoryRate={recentRespiratoryRate}
                recentHeartRate={recentHeartRate}
                recentTemperature={recentTemperature}
              />
              <DiagnosticList
                diagnosticList={selectedPatient.diagnostic_list}
              />
            </>
          )}
        </div>
        <div className="flex flex-[1.5] flex-col gap-3">
          {selectedPatient && (
            <>
              <PatientDetails
                name={selectedPatient.name}
                profilePicture={selectedPatient.profile_picture}
                dateOfBirth={selectedPatient.date_of_birth}
                gender={selectedPatient.gender}
                phoneNumber={selectedPatient.phone_number}
                emergencyContact={selectedPatient.emergency_contact}
                insuranceType={selectedPatient.insurance_type}
              />
              <LabResults labResults={selectedPatient.lab_results} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
