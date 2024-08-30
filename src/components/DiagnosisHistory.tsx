import {
  DiagnosisHistory as DiagnosisHistoryType,
  HealthMetric as HealthMetricType,
} from "@/types/patient";
import Image from "next/image";
import { BloodPressureChart } from "./BloodPressureChart";

// Define proper types for the props
type DiagnosisHistoryProps = {
  diagnosisHistory: DiagnosisHistoryType[];
  recentRespiratoryRate: HealthMetricType | null;
  recentHeartRate: HealthMetricType | null;
  recentTemperature: HealthMetricType | null;
};

// Update the DiagnosisHistory type
type DiagnosisHistory = {
  month: string;
  year: number;
  blood_pressure: {
    systolic: { value: number; levels: string };
    diastolic: { value: number; levels: string };
  };
  heart_rate: { value: number; levels: string };
  respiratory_rate: { value: number; levels: string };
  temperature: { value: number; levels: string };
};

type HealthMetric = {
  value: number;
  levels: string;
};

export function DiagnosisHistory({
  diagnosisHistory,
  recentRespiratoryRate,
  recentHeartRate,
  recentTemperature,
}: DiagnosisHistoryProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white p-5 pt-4">
      <h1 className="mb-3 text-lg font-bold">Diagnosis History</h1>
      <div className="flex h-[30%] flex-col">
        <div className="flex-1">
          <BloodPressureChart diagnosisHistory={diagnosisHistory} />
        </div>
        <div className="mt-0 flex flex-1 gap-4">
          <HealthMetric
            title="Respiratory Rate"
            data={recentRespiratoryRate}
            imageSrc="/respitory-rate.svg"
            bgColor="bg-[#E0F3FA]"
            unit="bpm"
          />

          <HealthMetric
            title="Temperature"
            data={recentTemperature}
            imageSrc="/temperature.svg"
            bgColor="bg-[#FFE6E9]"
            unit="°F"
          />
          <HealthMetric
            title="Heart Rate"
            data={recentHeartRate}
            imageSrc="/heart-bpm.svg"
            bgColor="bg-[#FFE6F1]"
            unit="bpm"
          />
        </div>
      </div>
    </div>
  );
}

type HealthMetricProps = {
  title: string;
  data: HealthMetricType | null;
  imageSrc: string;
  bgColor: string;
  unit: string;
};

function HealthMetric({
  title,
  data,
  imageSrc,
  bgColor,
  unit,
}: HealthMetricProps) {
  return (
    <div className={`flex-1 rounded-xl ${bgColor} p-4`}>
      <Image src={imageSrc} alt={title.toLowerCase()} width={66} height={66} />
      <p className="text-md">{title}</p>
      {data && (
        <div>
          <p className="text-xl font-bold">
            {data.value} {unit}
          </p>
          <p className="mt-2 text-sm text-gray-600">{data.levels}</p>
        </div>
      )}
    </div>
  );
}
