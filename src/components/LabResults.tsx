import { Download } from "lucide-react";
import { Button } from "./ui/button";

type LabResultsProps = {
  labResults: string[];
};

export function LabResults({ labResults }: LabResultsProps) {
  return (
    <div className="flex flex-col rounded-xl bg-white p-4">
      <h2 className="text-xl font-bold">Lab Results</h2>
      <div className="max-h-[70%] overflow-scroll">
        <ul>
          {labResults.map((result, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-lg transition-colors hover:bg-gray-50"
            >
              <span className="ml-2 text-sm">{result}</span>
              <Button variant="ghost" size="sm" className="ml-2">
                <Download size={16} />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
