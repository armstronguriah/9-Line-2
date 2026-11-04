import { useState, useEffect } from "react";
import RequestRow from "../components/RequestRow.tsx";
import type {MedevacRequest} from "../components/MedevacRequest.ts";

// Matches your Java Request Entity structure


export default function Responder() {
    const [requests, setRequests] = useState<MedevacRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 1. FETCH DATA: Calls your Spring Boot backend when the page loads
    useEffect(() => {
        fetch("http://localhost:8080/api/requests")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch requests from database");
                return res.json();
            })
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
            <h2>Responder Operations Dashboard</h2>
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
                        <RequestRow
                            key={req.id}
                            request={req}
                            parseJSONField={parseJSONField}
                        />
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}