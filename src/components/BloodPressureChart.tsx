"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Triangle } from "lucide-react"; // Add this import
import { Separator } from "./ui/separator";
import { bloodPressureChartOptions } from "@/config/chartOptions";
import { DiagnosisHistory } from "@/types/patient";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  diagnosisHistory: DiagnosisHistory[];
};

const dateRanges = [
  { label: "Last 6 Months", value: 6 },
  { label: "Last Year", value: 12 },
  { label: "Last 2 Years", value: 24 },
  { label: "All Data", value: 0 },
];

export function BloodPressureChart({ diagnosisHistory }: Props) {
  const [dateRange, setDateRange] = useState(6); // Default to 6 months
  const [chartData, setChartData] = useState<any>(null);
  const [recentReadings, setRecentReadings] = useState<{
    systolic: number;
    diastolic: number;
    systolicComparison: string;
    diastolicComparison: string;
  } | null>(null);

  useEffect(() => {
    if (!diagnosisHistory || diagnosisHistory.length === 0) return;

    const sortedData = [...diagnosisHistory].sort(
      (a, b) =>
        new Date(`${a.month} ${a.year}`).getTime() -
        new Date(`${b.month} ${b.year}`).getTime(),
    );

    const filteredData =
      dateRange === 0 ? sortedData : sortedData.slice(-dateRange);

    const dataPoints = 6;
    const step = Math.max(
      1,
      Math.floor((filteredData.length - 1) / (dataPoints - 1)),
    );

    const selectedData: DiagnosisHistory[] = [];
    for (let i = 0; i < dataPoints - 1; i++) {
      const index = Math.min(i * step, filteredData.length - 2);
      const dataPoint = filteredData[index];
      if (dataPoint) {
        selectedData.push(dataPoint);
      }
    }
    // Always add the most recent data point
    const lastDataPoint = filteredData[filteredData.length - 1];
    if (lastDataPoint) {
      selectedData.push(lastDataPoint);
    }

    const labels = selectedData.map(
      (d) => `${d.month.substring(0, 3)}, ${d.year}`,
    );
    const systolicData = selectedData.map(
      (d) => d.blood_pressure.systolic.value,
    );
    const diastolicData = selectedData.map(
      (d) => d.blood_pressure.diastolic.value,
    );

    // Disable the rule for the next line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    setChartData({
      labels,
      datasets: [
        {
          label: "Systolic",
          data: systolicData,
          borderColor: "#E66FD2",
          backgroundColor: "#E66FD2",
          borderWidth: 2, // Thinner line
          pointRadius: 6, // Larger point size
          pointHoverRadius: 8,
          pointBorderColor: "white",
          pointBorderWidth: 2,
        },
        {
          label: "Diastolic",
          data: diastolicData,
          borderColor: "#8C6FE6",
          backgroundColor: "#8C6FE6",
          borderWidth: 2, // Thinner line
          pointRadius: 6, // Larger point size
          pointHoverRadius: 8,
          pointBorderColor: "white",
          pointBorderWidth: 2,
        },
      ],
    });

    // Helper function to check if a value is a number
    const isNumber = (value: unknown): value is number =>
      typeof value === "number" && !isNaN(value);

    // Calculate average and set recent readingsˆ
    const avgSystolic =
      systolicData.filter(isNumber).length > 0
        ? systolicData.filter(isNumber).reduce((a, b) => a + b, 0) /
          systolicData.filter(isNumber).length
        : 0;
    const avgDiastolic =
      diastolicData.filter(isNumber).length > 0
        ? diastolicData.filter(isNumber).reduce((a, b) => a + b, 0) /
          diastolicData.filter(isNumber).length
        : 0;
    const mostRecentSystolic = isNumber(systolicData[systolicData.length - 1])
      ? systolicData[systolicData.length - 1]
      : 0;
    const mostRecentDiastolic = isNumber(
      diastolicData[diastolicData.length - 1],
    )
      ? diastolicData[diastolicData.length - 1]
      : 0;

    setRecentReadings({
      systolic: mostRecentSystolic ?? 0,
      diastolic: mostRecentDiastolic ?? 0,
      systolicComparison:
        mostRecentSystolic! > avgSystolic ? "higher" : "lower",
      diastolicComparison:
        mostRecentDiastolic! > avgDiastolic ? "higher" : "lower",
    });
  }, [diagnosisHistory, dateRange]);

  return (
    <div className="flex h-[95%] w-full flex-col rounded-xl bg-[#F4F0FE] pb-7 pl-4 pt-4">
      <div className="flex h-full">
        <div className="flex-[1]">
          <div className="flex items-start justify-between">
            <h2 className="text-md font-semibold">Blood Pressure</h2>
            <Select
              onValueChange={(value) => setDateRange(Number(value))}
              defaultValue="6" // Set default value to 6 months
            >
              <SelectTrigger className="w-[150px] border-none bg-transparent">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value.toString()}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="h-[calc(100%-26px)]">
            {chartData && (
              <div className="h-full w-full">
                <Line options={bloodPressureChartOptions} data={chartData} />
              </div>
            )}
          </div>
        </div>

        {recentReadings && (
          <div className="ml-4 flex flex-[.5] flex-col gap-3">
            <div>
              {/* Systolic section */}
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-[#E66FD2]"></div>
                <p className="text-md font-semibold">Systolic</p>
              </div>
              <p className="text-xl font-bold">{recentReadings.systolic}</p>
              <div className="flex items-center text-sm">
                {recentReadings.systolicComparison === "higher" ? (
                  <Triangle className="mr-1 h-2.5 w-2.5 fill-black text-black" />
                ) : (
                  <Triangle className="mr-1 h-2.5 w-2.5 rotate-180 fill-black text-black" />
                )}
                <span>
                  {recentReadings.systolicComparison.charAt(0).toUpperCase() +
                    recentReadings.systolicComparison.slice(1)}{" "}
                  than average
                </span>
              </div>
            </div>

            {/* Separator */}
            <Separator className="my-1 w-[90%]" />

            <div>
              {/* Diastolic section */}
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-[#8C6FE6]"></div>
                <p className="text-md font-semibold">Diastolic</p>
              </div>
              <p className="text-xl font-bold">{recentReadings.diastolic}</p>
              <div className="flex items-center text-sm">
                {recentReadings.diastolicComparison === "higher" ? (
                  <Triangle className="mr-1 h-2.5 w-2.5 fill-black text-black" />
                ) : (
                  <Triangle className="mr-1 h-2.5 w-2.5 rotate-180 fill-black text-black" />
                )}
                <span>
                  {recentReadings.diastolicComparison.charAt(0).toUpperCase() +
                    recentReadings.diastolicComparison.slice(1)}{" "}
                  than average
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
