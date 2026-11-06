import {useState, useEffect} from "react";
import RequestRow from "../components/RequestRow.tsx";
import type {MedevacRequest} from "../components/MedevacRequest.ts";

// Matches your Java Request Entity structure


export default function Dispatcher() {
    const [requests, setRequests] = useState<MedevacRequest[]>([]);
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
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Dispatcher Operations Dashboard</h2>
            <p>Total Active Requests: {requests.length}</p>

            {requests.length === 0 ? (
                <p>No active requests found in the database.</p>
            ) : (
                <div className={"overflow-x-auto rounded-lg border border-slate-200 shadow-sm"}>
                    <table className="w-full min-w-[700px] text-left text-sm" aria-label={"dispatch-table"}>
                        <thead>
                        <tr className={"bg-yellow-300 text-slate-700"}>
                            <th className={"px-4 py-3"}>Expand</th>
                            <th className={"px-4 py-3"}>Precedence</th>
                            <th className={"px-4 py-3"}>Location</th>
                            <th className={"px-4 py-3"}>Radio / Call Sign</th>
                            <th className={"px-4 py-3"}>Site Security</th>
                            <th className={"px-4 py-3"}>Special Equipment</th>
                            <th className={"px-4 py-3"}>Details</th>
                            <th className={"px-4 py-3"}></th>
                        </tr>
                        </thead>
                        <tbody className={"divide-y divide-slate-200"}>
                        {requests.map((req) => (
                            <RequestRow
                                key={req.id}
                                request={req}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>


    );
}