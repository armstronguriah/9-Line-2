import { useState } from "react";
import type {MedevacRequest} from "./MedevacRequest.ts";

type RequestProps = {
    request: MedevacRequest;
};
export default function RequestRow({request}: RequestProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const handleDelete=() => {
        console.log("Delete Request", request.id);
    }
    const sendToDispatcher = () => {
        console.log("Sending request", request.id);
    }

    return (
        <>

            <tr onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: "pointer" }} aria-label={'expand'}>
                <td>{isExpanded ? "[-]" : "[+]"}</td>
                <td>{request.patientPrecedence}</td>
                <td>{request.location}</td>
                <td>{request.radioFreq}</td>
                <td>{request.siteSecurity}</td>
                <td>{request.specialEquipment}</td>

            </tr>

            {isExpanded && (
                <tr>
                    <td> <input type="checkbox" name="checkbox" aria-label={'checkbox'}
                    checked={isSelected} onChange={(event)=>setIsSelected(event.target.checked)}/>
                    </td>
                    <td> {isSelected && (

                        <span>
                            <button onClick={handleDelete} value={"Delete?"}> </button>


                        <button onClick={sendToDispatcher} value={"Send To Dispatcher?"}> </button>

                        </span>
                        )}
                    </td>
                    <td

                        colSpan={7}>
                        <>
                            <p><strong>Full Details for Request #{request.id}</strong></p>
                            <p>Patients: {request.patientNumber} (Litter: {request.patientLitter}, Ambulatory: {request.patientAmbulatory})</p>
                            <p>Nationality/Status: {request.patientNationalityStatus}</p>
                            <p>Terrain: {request.terrainDescription}</p>
                            <p>Site Marking: {request.siteMarking}</p>
                            <p>Status: {request.status}</p>
                        </>
                    </td>
                </tr>
            )}
        </>
    );
                    }