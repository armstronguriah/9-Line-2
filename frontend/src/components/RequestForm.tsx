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
                        console.log("MEDEVAC form data (not transmitted):", formData);
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
                                    />
                                </div>
                            </form>
                        </div>
                    );
                }

                 export default MedevacForm;