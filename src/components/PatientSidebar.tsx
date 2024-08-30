"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreHorizontal, Search } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { PatientData } from "@/types/patient";

type PatientSidebarProps = {
  patients: PatientData[];
  selectedPatient: PatientData | null;
  onSelectPatient: (patient: PatientData) => void;
};

export function PatientSidebar({
  patients,
  selectedPatient,
  onSelectPatient,
}: PatientSidebarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const filteredPatients = useMemo(() => {
    return patients?.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [patients, searchTerm]);

  return (
    <aside className="flex h-[calc(100vh-5rem)] w-[300px] flex-col rounded-xl bg-white">
      <div className="flex items-center justify-between p-4">
        <h2 className="ml-3 text-xl font-bold">Patients</h2>
        <div ref={searchRef}>
          {searchOpen ? (
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-40"
              aria-label="Search patients"
            />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={20} />
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="patient-list h-full overflow-y-scroll pr-4">
          {filteredPatients && filteredPatients.length > 0 ? (
            <ul
              className="flex flex-col space-y-2"
              role="list"
              aria-label="Patient list"
            >
              {filteredPatients.map((patient) => (
                <li
                  key={patient.name}
                  className={`flex cursor-pointer items-center justify-between space-x-3 rounded-lg p-2 py-4 ${
                    selectedPatient?.name === patient.name
                      ? "bg-[#D8FCF7]"
                      : "hover:bg-[#D8FCF7]"
                  }`}
                  onClick={() => onSelectPatient(patient)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={patient.profile_picture}
                        alt={`${patient.name}'s profile picture`}
                      />
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">
                        {patient.gender}, {patient.age}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">No results found</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
