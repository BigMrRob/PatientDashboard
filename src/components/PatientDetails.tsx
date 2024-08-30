import Image from "next/image";
import { Calendar, User, Phone, UserPlus, Shield } from "lucide-react";
import { Button } from "./ui/button";

type PatientDetailsProps = {
  name: string;
  profilePicture: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  emergencyContact: string;
  insuranceType: string;
};

export function PatientDetails({
  name,
  profilePicture,
  dateOfBirth,
  gender,
  phoneNumber,
  emergencyContact,
  insuranceType,
}: PatientDetailsProps) {
  return (
    <div className="flex flex-[2] flex-col items-center rounded-xl bg-white p-6">
      <Image
        src={profilePicture}
        alt={`${name}'s profile picture`}
        width={120}
        height={120}
        className="rounded-full"
      />
      <h2 className="mt-4 text-xl font-bold">{name}</h2>
      <div className="mt-6 w-full space-y-3">
        <DetailItem
          icon={<Calendar size={16} />}
          title="Date of Birth"
          value={dateOfBirth}
        />
        <DetailItem icon={<User size={16} />} title="Gender" value={gender} />
        <DetailItem
          icon={<Phone size={16} />}
          title="Contact Info"
          value={phoneNumber}
        />
        <DetailItem
          icon={<UserPlus size={16} />}
          title="Emergency Contact"
          value={emergencyContact}
        />
        <DetailItem
          icon={<Shield size={16} />}
          title="Insurance Provider"
          value={insuranceType}
        />
      </div>
      <Button className="mt-6 rounded-full bg-[#01F0D0] text-black hover:bg-[#00D9BC]">
        Show All Information
      </Button>
    </div>
  );
}

type DetailItemProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function DetailItem({ icon, title, value }: DetailItemProps) {
  return (
    <div className="flex items-center">
      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-600">{title}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </div>
  );
}
