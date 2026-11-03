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
    const [isSelected, setIsSelected] = useState(false);
    const handleDelete=() => {
        console.log("Delete Request", request.id);
    }
    const sendToDipatcher = () => {
        console.log("Sending request", request.id);
    }

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
                    <td> <input type = "checkbox" name="checkbox"
                    checked={isSelected} onChange={(event)=>setIsSelected(event.target.checked)}/>
                    </td>
                    <td>{isSelected && (
                        <>
                            <button onClick={handleDelete}>
                                Delete?
                            </button>
                            <button onClick={sendToDipatcher}>
                                Send To Dispatcher?
                            </button>
                        </>)}
                    </td>
                    <td

                        colSpan={7}>
                        <>
                            <p><strong>Full Details for Request #{request.id}</strong></p>
                            <p>Patients: {request.patientNumber} (Litter: {request.patientLitter}, Ambulatory: {request.patientAmbulatory})</p>
                            <p>Nationality/Status: {request.patientNationalityStatus}</p>
                            <p>Terrain: {request.terrainDescription}</p>
                            <p>Site Marking: {parseJSONField(request.siteMarking)}</p>
                        </>
                    </td>
                </tr>
            )}
        </>
    );
}