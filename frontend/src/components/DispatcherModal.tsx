import type { MedevacRequest } from "./MedevacRequest";

interface DispatcherModalProps {
    show: boolean;
    onClose: () => void;
    request: MedevacRequest | null;
}

export default function DispatcherModal({
                                            show,
                                            onClose,
                                            request
                                        }: DispatcherModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">MEDEVAC Request</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl font-bold px-2"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div className="px-8 py-6 overflow-y-auto space-y-6">
                    {request ? (
                        <>
                            {/* Key-Value Detail List */}
                            <div className="space-y-3 text-sm">
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Location</span>
                                    <span className="text-gray-900">{request.location}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Call Sign</span>
                                    <span className="text-gray-900">{request.radioFreq || "[Call sign]"}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Number of Patients</span>
                                    <span className="text-gray-900">{request.patientNumber}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Precedence</span>
                                    <span className="text-gray-900">{request.patientPrecedence}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Special Equipment</span>
                                    <span className="text-gray-900">{request.specialEquipment || "None"}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Litter Patient</span>
                                    <span className="text-gray-900">{request.patientLitter}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Ambulatory Patient</span>
                                    <span className="text-gray-900">{request.patientAmbulatory}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Security at Pick-up site</span>
                                    <span className="text-gray-900">{request.siteSecurity}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Method of Marking</span>
                                    <span className="text-gray-900">{request.siteMarking}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">Patient Nationality and status</span>
                                    <span className="text-gray-900">{request.patientNationalityStatus}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-1 border-b border-gray-100">
                                    <span className="font-semibold text-right text-gray-700">NBC Contamination</span>
                                    <span className="text-gray-900">{request.terrainDescription || "Nuclear"}</span>
                                </div>
                            </div>

                            {/* Responder Selection Field */}
                            <div className="pt-2">
                                <label htmlFor="responderSelect" className="block text-sm font-medium text-gray-700 mb-1">
                                    Responder
                                </label>
                                <select
                                    id="responderSelect"
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                >
                                    <option value=""></option>
                                    <option value="responder-1">Alpha Evac Team</option>
                                    <option value="responder-2">Bravo Medically Equipped Unit</option>
                                    <option value="responder-3">Dustoff 6-1</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500 py-8">No request selected.</p>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={() => {
                            console.log("Assigned responder for request:", request?.id);
                            onClose();
                        }}
                        className="px-6 py-2 text-sm font-semibold text-black bg-[#ffc107] rounded-md hover:bg-amber-400"
                    >
                        ASSIGN
                    </button>
                </div>

            </div>
        </div>
    );
}