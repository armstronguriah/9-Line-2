import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import RequestRow from "../../components/RequestRow.tsx";
import {describe, expect, it} from "vitest";
import {userEvent} from "@testing-library/user-event/dist/cjs/setup/index.js";

describe ('RequestRow', () => {
    it('should check the checekbox when clicked', async () => {
    const user = userEvent.setup();
    render  (<RequestRow request={{
        id: 0,
        location: "",
        radioFreq: "",
        patientNumber: 0,
        patientPrecedence: "",
        specialEquipment: "",
        patientLitter: 0,
        patientAmbulatory: 0,
        siteSecurity: "",
        siteMarking: "",
        patientNationalityStatus: "",
        terrainDescription: ""
    }} parseJSONField={(val: string) => val}
        
    />);

        const expandToggle = screen.getByText('[+]');
        await user.click(expandToggle);

        const checkbox = screen.getByRole('checkbox', {name: /checekbox/i});
        expect(screen.getByRole("checkbox",{checked:false})).not.toBeChecked();
        await user.click(checkbox);
        expect(checkbox).toBeChecked();

    });
});



// it('should allow user to change status', () => {})