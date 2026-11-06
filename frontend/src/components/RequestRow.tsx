import { useState } from "react";
import type { MedevacRequest } from "./MedevacRequest.ts";
import DispatcherModal from "./DispatcherModal.tsx";


type RequestProps = {
    request: MedevacRequest;
};

export default function RequestRow({ request }: RequestProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleDelete = () => {
        console.log("Delete Request", request.id);
    };

    // Handle special equipment display
    const specialEquipmentData = request.specialEquipment || "";
    const regex = /"(\w+)":\s*true\b/g;
    const activeEquipment = [...specialEquipmentData.matchAll(regex)].map(match => match[1]);

    return (
        <>
            <tr>
                <td className="flex justify-center px-4 py-7">
                    <input
                        type="checkbox"
                        name="checkbox"
                        aria-label="checkbox"
                        checked={isSelected}
                        onChange={(event) => setIsSelected(event.target.checked)}
                        style={{ cursor: "pointer" }}
                    />
                </td>
                <td className="px-4 py-3">{request.patientPrecedence}</td>
                <td className="px-4 py-3">{request.location}</td>
                <td className="px-4 py-3">{request.radioFreq}</td>
                <td className="px-4 py-3">{request.siteSecurity}</td>
                <td className="px-4 py-3">{activeEquipment.join(", ")}</td>
                <td
                    onClick={() => setIsModalOpen(true)}
                    style={{ cursor: "pointer" }}
                    className="px-4 py-3 text-blue-600 hover:underline"
                >
                    View
                </td>
                <td
                    onClick={handleDelete}
                    style={{ cursor: "pointer" }}
                    className="px-4 py-3 text-red-600 font-semibold"
                >
                    {isSelected ? "Delete" : ""}
                </td>
            </tr>
            <DispatcherModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                request={request}
            />
        </>
    );
}