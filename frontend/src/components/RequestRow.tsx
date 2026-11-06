import {useState} from "react";
import type {MedevacRequest} from "./MedevacRequest.ts";


type RequestProps = {
    request: MedevacRequest;
};
export default function RequestRow({request}: RequestProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const handleDelete = () => {
        console.log("Delete Request", request.id);
    }
    const sendToResponder = () => {
        console.log("Sending request", request.id);
    }

    // handle special equipment display
    const specialEquipmentData = request.specialEquipment;
    const regex = /"(\w+)":\s*true\b/g;
    const activeEquipment = [...specialEquipmentData.matchAll(regex)].map(match => match[1]);

    // handle method of marking display
    const siteMarkingData = request.siteMarking;
    const activeSiteMarking = [...siteMarkingData.matchAll(regex)].map(match => match[1]);

    return (

        <>
            <tr onClick={() => setIsExpanded(!isExpanded)} style={{cursor: "pointer"}} aria-label={'expand'}>
                <td className="px-4 py-3">{isExpanded ? "[-]" : "[+]"}</td>
                <td className="px-4 py-3">{request.patientPrecedence}</td>
                <td className="px-4 py-3">{request.location}</td>
                <td className="px-4 py-3">{request.radioFreq}</td>
                <td className="px-4 py-3">{request.siteSecurity}</td>
                <td className="px-4 py-3">{activeEquipment.join(", ")}</td>


            </tr>

            {isExpanded && (
                <tr>
                    <td><input type="checkbox" name="checkbox" aria-label={'checkbox'}
                               checked={isSelected} onChange={(event) => setIsSelected(event.target.checked)}/>
                    </td>
                    <td> {isSelected && (

                        <span>
                            <button onClick={handleDelete} value={"Delete?"} aria-label={'deleteButton'}
                                    name={'deleteButton'}>
                              Delete
                            </button>


                        <button onClick={sendToResponder} value={"Send To Responder?"} aria-label={'responderButton'}
                                name={'responderButton'}>
                            Send to responder
                        </button>

                        </span>
                    )}
                    </td>
                    <td

                        colSpan={7}>
                        <div className="rounded-lg border-slate-200 p4">
                            <h3 className="mb-3 font-semibold text-slate-900">
                                Full Details for Request #{request.id}
                            </h3>
                            <div className="grid gap-2 sm:grid-cols-2">
                                <p>
                                    <strong>Patients:</strong> {request.patientNumber}
                                    {" "}(Litter: {request.patientLitter},
                                    Ambulatory: {request.patientAmbulatory})
                                </p>

                                <p>
                                    <strong>Nationality/Status:</strong>{" "}
                                    {request.patientNationalityStatus}
                                </p>

                                <p>
                                    <strong>Terrain:</strong> {request.terrainDescription}
                                </p>

                                <p>
                                    <strong>Site Marking:</strong>{" "}
                                    {activeSiteMarking.join(", ")}
                                </p>

                                <p>
                                    <strong>Status:</strong> {request.status}
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}