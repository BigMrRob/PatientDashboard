import { PatientData } from "@/types/patient";

type DiagnosticListProps = {
  diagnosticList: PatientData["diagnostic_list"];
};

export function DiagnosticList({ diagnosticList }: DiagnosticListProps) {
  return (
    <div className="flex-[.9] overflow-hidden rounded-xl bg-white">
      <div className="sticky top-0 bg-white pb-4 pl-5 pt-4">
        <h2 className="text-xl font-bold">Diagnostic List</h2>
      </div>
      <div className="px-6">
        <table className="w-full">
          <thead className="rounded-full bg-gray-100">
            <tr className="text-left">
              <th className="rounded-tl-lg px-4 py-2 text-sm font-bold text-gray-700">
                Problem/Diagnosis
              </th>
              <th className="px-4 py-2 text-sm font-bold text-gray-700">
                Description
              </th>
              <th className="rounded-tr-lg px-4 py-2 text-sm font-bold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {diagnosticList.map((diagnosis, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="px-4 py-3 text-sm">{diagnosis.name}</td>
                <td className="px-4 py-3 text-sm">{diagnosis.description}</td>
                <td className="px-4 py-3 text-sm">{diagnosis.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
