"use client";
import { useState, useCallback } from "react";
import { PatientData, DiagnosisHistory, HealthMetric } from "@/types/patient";

function sortDiagnosisHistory(diagnosisHistory: DiagnosisHistory[]) {
  return [...diagnosisHistory].sort((a, b) => {
    const dateA = new Date(`${a.month} ${a.year}`);
    const dateB = new Date(`${b.month} ${b.year}`);
    return dateB.getTime() - dateA.getTime();
  });
}

function getMostRecentData(
  diagnosisHistory: DiagnosisHistory[],
  key: keyof Omit<DiagnosisHistory, "month" | "year" | "blood_pressure">,
): HealthMetric | null {
  if (!diagnosisHistory ?? diagnosisHistory.length === 0) {
    return null;
  }

  const sortedHistory = sortDiagnosisHistory(diagnosisHistory);
  const mostRecent = sortedHistory[0];
  return mostRecent![key] as HealthMetric;
}

export function usePatientData(patients: PatientData[]) {
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(
    patients.find((patient) => patient.name === "Jessica Taylor") ?? null,
  );

  const onSelectPatient = useCallback((patient: PatientData) => {
    setSelectedPatient(patient);
  }, []);

  const recentRespiratoryRate = selectedPatient
    ? getMostRecentData(selectedPatient.diagnosis_history, "respiratory_rate")
    : null;
  const recentTemperature = selectedPatient
    ? getMostRecentData(selectedPatient.diagnosis_history, "temperature")
    : null;
  const recentHeartRate = selectedPatient
    ? getMostRecentData(selectedPatient.diagnosis_history, "heart_rate")
    : null;

  return {
    selectedPatient,
    onSelectPatient,
    recentRespiratoryRate,
    recentTemperature,
    recentHeartRate,
  };
}
