import {useEffect, useState} from "react";
import type {MedevacRequest} from "../components/MedevacRequest.ts";
import DispatcherTable from "../components/DispatcherTable.tsx";
import { fetchRequest } from "../services/RequestApi.ts";
import DispatcherModal from "../components/DispatcherModal.tsx";

export default function Dispatcher() {
    const [requests, setRequests] = useState<MedevacRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRequest, setSelectedRequest] = useState<MedevacRequest | null>(null);

    const handleOpen = (request: MedevacRequest) => {
        setSelectedRequest(request);
    };

    const handleClose = () => {
        setSelectedRequest(null);
    };


    useEffect(() => {
        fetchRequest()
            .then((data) => {
                setRequests(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);


    // 2. HELPER: Safely parses JSON strings stored in SQL text columns
    const parseJSONField = (fieldValue: string) => {
        try {
            const parsed = JSON.parse(fieldValue);
            if (typeof parsed === "object" && parsed !== null) {
                return Object.entries(parsed)
                    .filter(([_, val]) => val === true)
                    .map(([key]) => key)
                    .join(", ") || "None";
            }
        } catch {}
        return fieldValue;
    };

    if (loading) return <p>Loading requests...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Dispatcher Operations Dashboard</h2>
            <p>Total Active Requests: {requests.length}</p>

            {requests.length === 0 ? (
                <p>No active requests found in the database.</p>
            ) : (
                <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th>Expand</th>
                        <th>Precedence</th>
                        <th>Location</th>
                        <th>Radio / Call Sign</th>
                        <th>Site Security</th>
                        <th>Special Equipment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((req) => (
                        <DispatcherTable
                            key={req.id}
                            request={req}
                            parseJSONField={parseJSONField}
                            onExpand={() => handleOpen(req)}
                        />
                    ))}
                    </tbody>
                </table>
            )}
            <DispatcherModal
                show={selectedRequest !== null}
                onClose={handleClose}
                request={selectedRequest}
            />
        </div>
    );
}