import react, {useState } from 'react';

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
    security



}
