import { useState } from "react";
import type { MedevacRequest } from "./MedevacRequest.ts";



type RequestProps = {
    request: MedevacRequest;
    updateViewedRequest: (request: MedevacRequest) => void
};

export default function RequestRow({ request, updateViewedRequest }: RequestProps) {

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
                    onClick={() => updateViewedRequest(request)}
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
        </>
    );
}