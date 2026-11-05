

export interface MedevacRequest {
    id?: number;
    location: string;
    radioFreq: string;
    patientNumber: number | "";
    patientPrecedence: string;
    specialEquipment: string;
    patientLitter: number | "";
    patientAmbulatory: number | "";
    siteSecurity: string;
    siteMarking: string;
    patientNationalityStatus: string;
    terrainDescription: string;
    status?: string;
}