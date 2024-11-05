import { PrescriptionData } from "@/interfaces/Prescription";
import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card-hover-effect";
import Image from "next/image";

const PrescriptionCard = ({
  prescription,
}: {
  prescription: PrescriptionData;
}) => {
  const prescriptionContent = JSON.parse(prescription.content);

  /*return (
    <div className="bg-black cursor-pointer hover:scale-105 hover:-translate-y-2 transition duration-200 ease-in-out w-full rounded-md border border-neutral-600 shadow-md shadow-neutral-600 p-4 md:p-6">
      <h2 className="text-neutral-100"></h2>
      <p className="text-neutral-400"></p>
    </div>
  );*/
  return (
    <Card className="">
      <div className="flex items-start gap-4">
        <div className="w-20 h-full rounded-sm overflow-hidden">
          <Image
            src={prescription.imageUrl}
            width={100}
            height={100}
            alt="prescription"
            className="bg-cover"
          />
        </div>
        <div>
          <p className="text-white text-base">{prescriptionContent.title}</p>
          <p className="text-neutral-400 text-sm">
            Generated on{" "}
            {new Date(prescription.createdAt).toLocaleDateString().toString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PrescriptionCard;
