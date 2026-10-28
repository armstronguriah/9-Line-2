import React, {useState } from 'react';

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

export const MedevacForm: React.FC = () => {
    const [formData, setFormData] = useState<MedevacFormData>({
        location: '',
        callSign: '',
        patientNumber: 0,
        precedence: '',
        specialEquipment: {
            none: false,
            hoist: false,
            extractionEquipment: false,
            ventilator: false,
        },
        litterPatients: 0,
        ambulatoryPatients: 0,
        security: '',
        methodOfPickup: {
            panels: false,
            pyrotechnicSignal: false,
            smokeSignal: false,
            none: false,
            other: false,
        },
        patientNationalityAndStatus: '',
        nbcContamination: '',
    });
   //const [errors, setErrors] = useState<{ precedence?: string }>({});


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'patientNumber' || name === 'litterPatients' || name === 'ambulatoryPatients'
                ? parseInt(value) || 0
                : value,
        }))
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submitted successfully:', formData);
    };


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            specialEquipment: {
                ...prev.specialEquipment,
                [name]: checked,
            },
        }));
    };




    return (
        <div className="medevac-container">
            <h2 className="medevac-title">MEDEVAC Request Form</h2>

            <form onSubmit={handleSubmit} className="medevac-form">


                <div className="field-group">
                    <label htmlFor={"location"} className="field-label">Location</label>
                    <input
                        id={"location"}
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="text-input"
                        placeholder="Enter MGRS Location"
                    />
                    <div className="subtext">{'Enter MGRS Location'}</div>
                </div>


                <div className="field-group">
                    <label htmlFor={"callsign"} className="field-label">Radio Frequency/ Call Sign / Suffix</label>
                    <input
                        id={"callsign"}
                        type="text"
                        name="callSign"
                        placeholder="Call Sign"
                        value={formData.callSign}
                        onChange={handleInputChange}
                        className="text-input"
                    />
                </div>


                <div className="form-row">
                    <div className="field-group flex-1">
                        <label htmlFor={"patientNumber"} className="field-label">Patient Number</label>
                        <input
                            id={"patientNumber"}
                            type="number"
                            name="patientNumber"
                            value={formData.patientNumber}
                            onChange={handleInputChange}
                            className="text-input"
                        />
                    </div>

                    <div className={`field-wrapper flex-2 `}>
                        <div className="field-group">
                            <label htmlFor={"precedence"} className="field-label">Precedence</label>
                            <select
                                id={"precedence"}
                                name="precedence"
                                value={formData.precedence}
                                onChange={handleInputChange}
                                className="select-input"
                            >
                                <option value="">Select Precedence...</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Urgent-Surgical">Urgent-Surgical</option>
                                <option value="Priority">Priority</option>
                                <option value="Routine">Routine</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div className="equipment-section">
                    <h3 className="section-header">Special Equipment</h3>

                    <label className="checkbox-label">
                        <input
                            id="noneCheck"
                            type="checkbox"
                            name="none"
                            checked={formData.specialEquipment.none}
                            onChange={handleCheckboxChange}
                            className="checkbox-input"
                        />
                        None
                    </label>

                    <label className="checkbox-label">
                        <input
                            id="hoistCheck"
                            type="checkbox"
                            name="hoist"
                            checked={formData.specialEquipment.hoist}
                            onChange={handleCheckboxChange}
                            className="checkbox-input"
                        />
                        Hoist
                    </label>

                    <label className="checkbox-label">
                        <input
                            id="extractionCheck"
                            type="checkbox"
                            name="extractionEquipment"
                            checked={formData.specialEquipment.extractionEquipment}
                            onChange={handleCheckboxChange}
                            className="checkbox-input"
                        />
                        Extraction Equipment
                    </label>

                    <label className="checkbox-label">
                        <input
                            id="ventilatorCheck"
                            type="checkbox"
                            name="ventilator"
                            checked={formData.specialEquipment.ventilator}
                            onChange={handleCheckboxChange}
                            className="checkbox-input"
                        />
                        Ventilator
                    </label>
                </div>


                <div className="form-row">
                    <div className="field-group flex-1">
                        <label className="field-label">Litter Patient #</label>
                        <select
                            name="litterPatients"
                            value={formData.litterPatients}
                            onChange={handleInputChange}
                            className="select-input"
                        >
                            {[...Array(11).keys()].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field-group flex-1">
                        <label className="field-label">Ambulatory Patient #</label>
                        <select
                            name="ambulatoryPatients"
                            value={formData.ambulatoryPatients}
                            onChange={handleInputChange}
                            className="select-input"
                        >
                            {[...Array(11).keys()].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>




                    </div>







                </div>

                <button type="submit" className="submit-button">
                    Submit Request
                </button>
            </form>
        </div>
    );
}


