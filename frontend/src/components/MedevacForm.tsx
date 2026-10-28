import {useState, type ChangeEvent, type FormEvent} from "react";
// import "./MedevacForm.css";

interface MedevacFormData {
    location: string;
    callSign: string;
    patientNumber: number;
    precedence: string;
    specialEquipment: {
        none: boolean;
        hoist: boolean;
        extractionEquipment: boolean;
        ventilator: boolean;
    };
    litterPatients: number;
    ambulatoryPatients: number;
    security: string;
    methodOfPickup: {
        panels: boolean;
        pyrotechnicSignal: boolean;
        smokeSignal: boolean;
        none: boolean;
        other: boolean;
    };
    patientNationalityAndStatus: string;
    nbcContamination: string;
}

type CheckboxSection = "specialEquipment" | "methodOfPickup";

const specialEquipmentOptions: {
    name: keyof MedevacFormData["specialEquipment"];
    label: string;
}[] = [
    {name: "none", label: "None"},
    {name: "hoist", label: "Hoist"},
    {name: "extractionEquipment", label: "Extraction Equipment"},
    {name: "ventilator", label: "Ventilator"},
];

const pickupOptions: {
    name: keyof MedevacFormData["methodOfPickup"];
    label: string;
}[] = [
    {name: "panels", label: "Panels"},
    {name: "pyrotechnicSignal", label: "Pyrotechnic signal"},
    {name: "smokeSignal", label: "Smoke Signal"},
    {name: "none", label: "None"},
    {name: "other", label: "Other"},
];

export function MedevacForm() {
    const [formData, setFormData] = useState<MedevacFormData>({
        location: "",
        callSign: "",
        patientNumber: 0,
        precedence: "",
        specialEquipment: {
            none: false,
            hoist: false,
            extractionEquipment: false,
            ventilator: false,
        },
        litterPatients: 0,
        ambulatoryPatients: 0,
        security: "",
        methodOfPickup: {
            panels: false,
            pyrotechnicSignal: false,
            smokeSignal: false,
            none: false,
            other: false,
        },
        patientNationalityAndStatus: "",
        nbcContamination: "",
    });
    const [submitted, setSubmitted] = useState(false);

    // Updates text inputs and selects. Count fields are stored as numbers.
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.currentTarget;
        const numericField = ["patientNumber", "litterPatients", "ambulatoryPatients"].includes(name);

        setFormData((prev) => ({
            ...prev,
            [name]: numericField ? Number(value) || 0 : value,
        }));
        setSubmitted(false);
    };

    // Updates the correct nested checkbox group rather than always changing specialEquipment.
    const handleCheckboxChange = (
        section: CheckboxSection,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const {name, checked} = event.currentTarget;

        setFormData((prev) => {
            const updated: Record<string, boolean> = {...prev[section], [name]: checked};

            // "None" is mutually exclusive with the other checkboxes in the group.
            if (checked && name === "none") {
                for (const key of Object.keys(updated)) {
                    if (key !== "none") updated[key] = false;
                }
            } else if (checked) {
                updated.none = false;
            }

            return {...prev, [section]: updated};
        });
        setSubmitted(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // These are the two fields shown as required in the reference screenshot.
        if (!formData.precedence || !formData.patientNationalityAndStatus) {
            setSubmitted(false);
            return;
        }

        // Demo only: this does NOT transmit a real MEDEVAC request.
        console.log("MEDEVAC form data:", formData);
        setSubmitted(true);
    };

    return (
        <div className="medevac-container">
            <h2 className="medevac-title">MEDEVAC Request Form</h2>

            <form className="medevac-form" onSubmit={handleSubmit} noValidate>
                <div className="field-group">
                    <label htmlFor="location" className="field-label">Location</label>
                    <input
                        id="location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="56J MS 80443 25375"
                        className="text-input"
                    />
                </div>
                <p className="subtext">MGRS Format</p>

                <div className="field-group">
                    <label htmlFor="callSign" className="field-label">
                        Radio Frequency/ Call Sign / Suffix
                    </label>
                    <input
                        id="callSign"
                        type="text"
                        name="callSign"
                        value={formData.callSign}
                        onChange={handleInputChange}
                        placeholder="(Call Sign)"
                        className="text-input"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="field-group flex-1">
                        <label htmlFor="patientNumber" className="field-label">Patient Number</label>
                        <input
                            id="patientNumber"
                            type="number"
                            name="patientNumber"
                            min={0}
                            value={formData.patientNumber}
                            onChange={handleInputChange}
                            className="text-input"
                            required
                        />
                    </div>

                    <div className="field-wrapper flex-2">
                        <div className={`field-group ${!formData.precedence ? "is-invalid" : ""}`}>
                            <label htmlFor="precedence" className="field-label">Precedence</label>
                            <select
                                id="precedence"
                                name="precedence"
                                value={formData.precedence}
                                onChange={handleInputChange}
                                className="select-input"
                                aria-invalid={!formData.precedence}
                                aria-describedby={!formData.precedence ? "precedence-error" : undefined}
                                required
                            >
                                <option value="">Precedence</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Urgent-Surgical">Urgent-Surgical</option>
                                <option value="Priority">Priority</option>
                                <option value="Routine">Routine</option>
                            </select>
                        </div>
                        {!formData.precedence && (
                            <small id="precedence-error" className="field-error">Required Field</small>
                        )}
                    </div>
                </div>

                <div className="equipment-section">
                    <h3 className="section-header">Special Equipment</h3>
                    {specialEquipmentOptions.map(({name, label}) => (
                        <label key={name} className="checkbox-label">
                            <input
                                type="checkbox"
                                name={name}
                                checked={formData.specialEquipment[name]}
                                onChange={(event) => handleCheckboxChange("specialEquipment", event)}
                                className="checkbox-input"
                                required
                            />
                            {label}
                        </label>
                    ))}
                </div>

                <div className="form-row patient-types-row">
                    <div className="field-group flex-1">
                        <label htmlFor="litterPatients" className="field-label">Litter Patient #</label>
                        <select
                            id="litterPatients"
                            name="litterPatients"
                            value={formData.litterPatients}
                            onChange={handleInputChange}
                            className="select-input"
                            required

                        >
                            {Array.from({length: 11}, (_, count) => (
                                <option key={count} value={count}>{count}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field-group flex-1">
                        <label htmlFor="ambulatoryPatients" className="field-label">Ambulatory Patient #</label>
                        <select
                            id="ambulatoryPatients"
                            name="ambulatoryPatients"
                            value={formData.ambulatoryPatients}
                            onChange={handleInputChange}
                            className="select-input"
                            required
                        >
                            {Array.from({length: 11}, (_, count) => (
                                <option key={count} value={count}>{count}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="field-group">
                    <label htmlFor="security" className="field-label">Security at Pick-Up Site</label>
                    <select
                        id="security"
                        name="security"
                        value={formData.security}
                        onChange={handleInputChange}
                        className="select-input"
                        required

                    >
                        <option value="">Select security status</option>
                        <option value="No enemy troops in area">No enemy troops in area</option>
                        <option value="Possible enemy troops in area">Possible enemy troops in area</option>
                        <option value="Enemy troops in area (approach with caution)">
                            Enemy troops in area (approach with caution)
                        </option>
                        <option value="Enemy troops in area (armed escort required)">
                            Enemy troops in area (armed escort required)
                        </option>
                    </select>
                </div>

                <div className="equipment-section marking-section">
                    <h3 className="section-header">Method of Marking Pick-up Site</h3>
                    {pickupOptions.map(({name, label}) => (
                        <label key={name} className="checkbox-label">
                            <input
                                type="checkbox"
                                name={name}
                                checked={formData.methodOfPickup[name]}
                                onChange={(event) => handleCheckboxChange("methodOfPickup", event)}
                                className="checkbox-input"
                                required

                            />
                            {label}
                        </label>
                    ))}
                </div>

                <div className="field-wrapper">
                    <div className={`field-group ${!formData.patientNationalityAndStatus ? "is-invalid" : ""}`}>
                        <label htmlFor="patientNationalityAndStatus" className="field-label">
                            Patient Nationality and Status
                        </label>
                        <select
                            id="patientNationalityAndStatus"
                            name="patientNationalityAndStatus"
                            value={formData.patientNationalityAndStatus}
                            onChange={handleInputChange}
                            className="select-input"
                            aria-invalid={!formData.patientNationalityAndStatus}
                            aria-describedby={!formData.patientNationalityAndStatus ? "nationality-error" : undefined}
                            required
                        >
                            <option value="">Patient Nationality and Status</option>
                            <option value="US Military">US Military</option>
                            <option value="US Civilian">US Civilian</option>
                            <option value="Non-US Military">Non-US Military</option>
                            <option value="Non-US Civilian">Non-US Civilian</option>
                            <option value="Enemy Prisoner of War">Enemy Prisoner of War</option>
                        </select>
                    </div>
                    {!formData.patientNationalityAndStatus && (
                        <small id="nationality-error" className="field-error">Required Field</small>
                    )}
                </div>

                <div className="field-group">
                    <label htmlFor="nbcContamination" className="field-label">NBC Contamination</label>
                    <select
                        id="nbcContamination"
                        name="nbcContamination"
                        value={formData.nbcContamination}
                        onChange={handleInputChange}
                        className="select-input"
                        required

                    >
                        <option value="">NBC Contamination</option>
                        <option value="None">None</option>
                        <option value="Nuclear">Nuclear</option>
                        <option value="Biological">Biological</option>
                        <option value="Chemical">Chemical</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button">SUBMIT</button>
                </div>
                {submitted && (
                    <p role="status" className="submit-message">
                        Form data logged locally for testing. No request was transmitted.
                    </p>
                )}
            </form>
        </div>
    );
}

export default MedevacForm;
