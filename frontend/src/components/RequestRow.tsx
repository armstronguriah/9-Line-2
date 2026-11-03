import { useState } from "react";

interface RequestRowProps {
    request: {
        id: number;
        location: string;
        radioFreq: string;
        patientNumber: number;
        patientPrecedence: string;
        specialEquipment: string;
        patientLitter: number;
        patientAmbulatory: number;
        siteSecurity: string;
        siteMarking: string;
        patientNationalityStatus: string;
        terrainDescription: string;
    };
    parseJSONField: (val: string) => string;
}

export default function RequestRow({ request, parseJSONField }: RequestRowProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>

            <tr onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: "pointer" }}>
                <td>{isExpanded ? "[-]" : "[+]"}</td>
                <td>{request.patientPrecedence}</td>
                <td>{request.location}</td>
                <td>{request.radioFreq}</td>
                <td>{request.siteSecurity}</td>
                <td>{parseJSONField(request.specialEquipment)}</td>
                <td>Logged</td>
            </tr>

            {isExpanded && (
                <tr>
                    <td> <input type = "checkbox"/> </td>
                    <td colSpan={7}>
                        <div>
                            <p><strong>Full Details for Request #{request.id}</strong></p>
                            <p>Patients: {request.patientNumber} (Litter: {request.patientLitter}, Ambulatory: {request.patientAmbulatory})</p>
                            <p>Nationality/Status: {request.patientNationalityStatus}</p>
                            <p>Terrain: {request.terrainDescription}</p>
                            <p>Site Marking: {parseJSONField(request.siteMarking)}</p>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}