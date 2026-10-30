import { useState, type ChangeEvent, type FormEvent } from "react";

interface MedevacFormData {
  location: string;
  radioFreq: string;
  patientNumber: number | "";
  patientPrecedence: string;
  specialEquipment: {
    none: boolean;
    hoist: boolean;
    extractionEquipment: boolean;
    ventilator: boolean;
  };
  patientLitter: number | "";
  patientAmbulatory: number | "";
  siteSecurity: string;
  siteMarking: {
    panels: boolean;
    pyrotechnicSignal: boolean;
    smokeSignal: boolean;
    none: boolean;
    other: boolean;
  };
  patientNationalityStatus: string;
  terrainDescription: string;
}

type FormErrors = Partial<Record<keyof MedevacFormData, string>>;
type CheckboxSection = "specialEquipment" | "siteMarking";

const specialEquipmentOptions: {
  name: keyof MedevacFormData["specialEquipment"];
  label: string;
}[] = [
  { name: "none", label: "None" },
  { name: "hoist", label: "Hoist" },
  { name: "extractionEquipment", label: "Extraction Equipment" },
  { name: "ventilator", label: "Ventilator" },
];

const pickupOptions: {
  name: keyof MedevacFormData["siteMarking"];
  label: string;
}[] = [
  { name: "panels", label: "Panels" },
  { name: "pyrotechnicSignal", label: "Pyrotechnic signal" },
  { name: "smokeSignal", label: "Smoke Signal" },
  { name: "none", label: "None" },
  { name: "other", label: "Other" },
];

// All class names are complete, static Tailwind classes so Tailwind can detect them.
const fieldBase =
  "flex min-h-[34px] flex-col justify-center rounded-t-[2px] border-b bg-[#ededed] px-[7px] py-[3px]";
const fieldClass = (error?: string) =>
  `${fieldBase} ${error ? "border-[#fa6464]" : "border-[#ababab]"}`;
const fieldLabel = "text-[9px] leading-3 text-[#333]";
const fieldControl =
  "w-full min-w-0 border-0 bg-transparent p-0 text-[11px] leading-[17px] text-[#161616] placeholder:text-[#444] focus:outline-none";
const checkboxLabel =
  "mb-[11px] ml-[5px] flex w-fit max-w-full cursor-pointer items-center gap-[6px] text-[10px] leading-[13px] text-[#666]";
const checkboxInput = "size-[11px] shrink-0 accent-[#555]";
const groupLegend = "mb-[5px] text-[11px] leading-4 text-[#555]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-[3px] pl-[7px] text-[9px] leading-3 text-[#e25555]">
      {message}
    </p>
  );
}

function validateForm(data: MedevacFormData): FormErrors {
  const errors: FormErrors = {};
  //Regex for MGRS input validation
  const mgrsRegex =
      /^(?:0?[1-9]|[1-5]\d|60)[C-HJ-NP-X][A-HJ-NP-Z][A-HJ-NP-V]\d{10}$/i;
  const validateMGRS = (value: string): boolean => {
    const normalized = value.replace(/\s/g, "").toUpperCase();

    return mgrsRegex.test(normalized);
  };

  if (!data.location.trim()) errors.location = "Required Field";
  else if(!validateMGRS(data.location)) errors.location="Must be in MGRS Format";
  if (!data.radioFreq.trim()) errors.radioFreq = "Required Field";
  if (data.patientNumber === "" || data.patientNumber < 1) {
    errors.patientNumber = "Enter at least 1 patient";
  }
  if (!data.patientPrecedence) errors.patientPrecedence = "Required Field";
  if (!Object.values(data.specialEquipment).some(Boolean)) {
    errors.specialEquipment = "Select at least one option";
  }
  // 0 is a valid patient-type count, but the user must select it explicitly.
  if (data.patientLitter === "") errors.patientLitter = "Required Field";
  if (data.patientAmbulatory === "") errors.patientAmbulatory = "Required Field";
  if (!data.siteSecurity) errors.siteSecurity = "Required Field";
  if (!Object.values(data.siteMarking).some(Boolean)) {
    errors.siteMarking = "Select at least one option";
  }
  if (!data.patientNationalityStatus) {
    errors.patientNationalityStatus = "Required Field";
  }
  if (!data.terrainDescription) errors.terrainDescription = "Required Field";

  return errors;
}

export function MedevacForm() {
  const [formData, setFormData] = useState<MedevacFormData>({
    location: "",
    radioFreq: "",
    patientNumber: "",
    patientPrecedence: "",
    specialEquipment: {
      none: false,
      hoist: false,
      extractionEquipment: false,
      ventilator: false,
    },
    patientLitter: "",
    patientAmbulatory: "",
    siteSecurity: "",
    siteMarking: {
      panels: false,
      pyrotechnicSignal: false,
      smokeSignal: false,
      none: false,
      other: false,
    },
    patientNationalityStatus: "",
    terrainDescription: "",
  });

  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Once submission is attempted, errors update as the user corrects fields.
  const errors = showErrors ? validateForm(formData) : {};

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    const isNumber = ["patientNumber", "patientLitter", "patientAmbulatory"].includes(name);

    setFormData((previous) => ({
      ...previous,
      [name]: isNumber ? (value === "" ? "" : Number(value)) : value,
    }));
    setSubmitted(false);
  };

  const handleCheckboxChange = (
    section: CheckboxSection,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.currentTarget;

    setFormData((previous) => {
      const updated: Record<string, boolean> = { ...previous[section], [name]: checked };

      // "None" cannot be selected together with other options in the group.
      if (checked && name === "none") {
        Object.keys(updated).forEach((key) => {
          if (key !== "none") updated[key] = false;
        });
      } else if (checked) {
        updated.none = false;
      }

      return { ...previous, [section]: updated };
    });
    setSubmitted(false);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrors(true);

    if (Object.keys(validateForm(formData)).length > 0) {
      setSubmitted(false);
      return;
    }

    // UI demonstration only: do not send or store sensitive details in a console.
    try {
      console.log(formData);
      const requestBody = {
        ...formData,
        specialEquipment: JSON.stringify(formData.specialEquipment),
        siteMarking: JSON.stringify(formData.siteMarking),
      }

      console.log(requestBody);

      const response = await fetch(
          "http://localhost:8080/api/requests",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          }
      )
      console.log(response)

      const savedData = await response.json();

      console.log(savedData);
    }
    catch (error) {
      setSubmitted(false);
    }
    setSubmitted(true);

  };

  return (
    <div className="w-full bg-white px-4 pb-6 pt-3 font-sans text-[#181818] ">
      <h2 className="mb-[19px] text-black font-medium leading-tight">
        MEDEVAC Request Form
      </h2>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[23px]">
        {/* Location */}
        <div className="min-w-0">
          <div className={fieldClass(errors.location)}>
            <label htmlFor="location" className={fieldLabel}>Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="56J MS 80443 25375"
              className={fieldControl}
              aria-invalid={Boolean(errors.location)}
              aria-describedby={errors.location ? "location-error" : undefined}
            />
          </div>
          <FieldError id="location-error" message={errors.location} />
          <p className="mt-[3px] pl-[7px] text-[11px] text-[#666]">MGRS Format</p>
        </div>

        {/* Radio frequency / call sign */}
        <div className="min-w-0">
          <div className={fieldClass(errors.radioFreq)}>
            <label htmlFor="radioFreq" className={fieldLabel}>
              Radio Frequency/ Call Sign / Suffix
            </label>
            <input
              id="radioFreq"
              name="radioFreq"
              type="text"
              value={formData.radioFreq}
              onChange={handleInputChange}
              placeholder="(Call Sign)"
              className={fieldControl}
              aria-invalid={Boolean(errors.radioFreq)}
              aria-describedby={errors.radioFreq ? "radioFreq-error" : undefined}
            />
          </div>
          <FieldError id="radioFreq-error" message={errors.radioFreq} />
        </div>

        {/* Patient count and patientPrecedence */}
        <div className="flex items-start gap-[10px]">
          <div className="min-w-0 flex-1">
            <div className={fieldClass(errors.patientNumber)}>
              <label htmlFor="patientNumber" className={fieldLabel}>Patient Number</label>
              <input
                id="patientNumber"
                name="patientNumber"
                type="number"
                min={1}
                step={1}
                value={formData.patientNumber}
                onChange={handleInputChange}
                className={fieldControl}
                aria-invalid={Boolean(errors.patientNumber)}
                aria-describedby={errors.patientNumber ? "patientNumber-error" : undefined}
              />
            </div>
            <FieldError id="patientNumber-error" message={errors.patientNumber} />
          </div>

          <div className="min-w-0 flex-[2]">
            <div className={fieldClass(errors.patientPrecedence)}>
              <label htmlFor="patientPrecedence" className={fieldLabel}>Precedence</label>
              <select
                id="patientPrecedence"
                name="patientPrecedence"
                value={formData.patientPrecedence}
                onChange={handleInputChange}
                className={`${fieldControl} cursor-pointer`}
                aria-invalid={Boolean(errors.patientPrecedence)}
                aria-describedby={errors.patientPrecedence ? "patientPrecedence-error" : undefined}
              >
                <option value="">Select Precedence...</option>
                <option value="Urgent">Urgent</option>
                <option value="Urgent-Surgical">Urgent-Surgical</option>
                <option value="Priority">Priority</option>
                <option value="Routine">Routine</option>
              </select>
            </div>
            <FieldError id="patientPrecedence-error" message={errors.patientPrecedence} />
          </div>
        </div>

        {/* Special equipment: one selected option is required */}
        <fieldset className="-mt-[5px] min-w-0 border-0 p-0" aria-describedby={errors.specialEquipment ? "specialEquipment-error" : undefined}>
          <legend className={`${groupLegend} ${errors.specialEquipment ? "text-[#c94545]" : ""}`}>
            Special Equipment
          </legend>
          {specialEquipmentOptions.map(({ name, label }) => (
            <label key={name} className={checkboxLabel}>
              <input
                type="checkbox"
                name={name}
                checked={formData.specialEquipment[name]}
                onChange={(event) => handleCheckboxChange("specialEquipment", event)}
                className={checkboxInput}
              />
              {label}
            </label>
          ))}
          <FieldError id="specialEquipment-error" message={errors.specialEquipment} />
        </fieldset>

        {/* Litter and ambulatory counts */}
        <div className="flex items-start gap-[10px]">
          <div className="min-w-0 flex-1">
            <div className={fieldClass(errors.patientLitter)}>
              <label htmlFor="patientLitter" className={fieldLabel}>Litter Patient #</label>
              <select
                id="patientLitter"
                name="patientLitter"
                value={formData.patientLitter}
                onChange={handleInputChange}
                className={`${fieldControl} cursor-pointer`}
                aria-invalid={Boolean(errors.patientLitter)}
                aria-describedby={errors.patientLitter ? "patientLitter-error" : undefined}
              >
                <option value="">Select count...</option>
                {Array.from({ length: 11 }, (_, count) => (
                  <option value={count} key={count}>{count}</option>
                ))}
              </select>
            </div>
            <FieldError id="patientLitter-error" message={errors.patientLitter} />
          </div>
          <div className="min-w-0 flex-1">
            <div className={fieldClass(errors.patientAmbulatory)}>
              <label htmlFor="patientAmbulatory" className={fieldLabel}>Ambulatory Patient #</label>
              <select
                id="patientAmbulatory"
                name="patientAmbulatory"
                value={formData.patientAmbulatory}
                onChange={handleInputChange}
                className={`${fieldControl} cursor-pointer`}
                aria-invalid={Boolean(errors.patientAmbulatory)}
                aria-describedby={errors.patientAmbulatory ? "patientAmbulatory-error" : undefined}
              >
                <option value="">Select count...</option>
                {Array.from({ length: 11 }, (_, count) => (
                  <option value={count} key={count}>{count}</option>
                ))}
              </select>
            </div>
            <FieldError id="patientAmbulatory-error" message={errors.patientAmbulatory} />
          </div>
        </div>

        {/* Security */}
        <div className="min-w-0">
          <div className={fieldClass(errors.siteSecurity)}>
            <label htmlFor="siteSecurity" className={fieldLabel}>Security at Pick-Up Site</label>
            <select
              id="siteSecurity"
              name="siteSecurity"
              value={formData.siteSecurity}
              onChange={handleInputChange}
              className={`${fieldControl} cursor-pointer`}
              aria-invalid={Boolean(errors.siteSecurity)}
              aria-describedby={errors.siteSecurity ? "siteSecurity-error" : undefined}
            >
              <option value="">Select siteSecurity status...</option>
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
          <FieldError id="siteSecurity-error" message={errors.siteSecurity} />
        </div>

        {/* Pick-up site marking */}
        <fieldset className="-mt-[2px] min-w-0 border-0 p-0" aria-describedby={errors.siteMarking ? "siteMarking-error" : undefined}>
          <legend className={`${groupLegend} ${errors.siteMarking ? "text-[#c94545]" : ""}`}>
            Method of Marking Pick-up Site
          </legend>
          {pickupOptions.map(({ name, label }) => (
            <label key={name} className={checkboxLabel}>
              <input
                type="checkbox"
                name={name}
                checked={formData.siteMarking[name]}
                onChange={(event) => handleCheckboxChange("siteMarking", event)}
                className={checkboxInput}
              />
              {label}
            </label>
          ))}
          <FieldError id="siteMarking-error" message={errors.siteMarking} />
        </fieldset>

        {/* Patient nationality and status */}
        <div className="min-w-0">
          <div className={fieldClass(errors.patientNationalityStatus)}>
            <label htmlFor="patientNationalityStatus" className={fieldLabel}>
              Patient Nationality and Status
            </label>
            <select
              id="patientNationalityStatus"
              name="patientNationalityStatus"
              value={formData.patientNationalityStatus}
              onChange={handleInputChange}
              className={`${fieldControl} cursor-pointer`}
              aria-invalid={Boolean(errors.patientNationalityStatus)}
              aria-describedby={errors.patientNationalityStatus ? "nationality-error" : undefined}
            >
              <option value="">Select nationality/status...</option>
              <option value="US Military">US Military</option>
              <option value="US Civilian">US Civilian</option>
              <option value="Non-US Military">Non-US Military</option>
              <option value="Non-US Civilian">Non-US Civilian</option>
              <option value="Enemy Prisoner of War">Enemy Prisoner of War</option>
            </select>
          </div>
          <FieldError id="nationality-error" message={errors.patientNationalityStatus} />
        </div>

        {/* NBC contamination */}
        <div className="min-w-0">
          <div className={fieldClass(errors.terrainDescription)}>
            <label htmlFor="terrainDescription" className={fieldLabel}>NBC Contamination</label>
            <select
              id="terrainDescription"
              name="terrainDescription"
              value={formData.terrainDescription}
              onChange={handleInputChange}
              className={`${fieldControl} cursor-pointer`}
              aria-invalid={Boolean(errors.terrainDescription)}
              aria-describedby={errors.terrainDescription ? "terrainDescription-error" : undefined}
            >
              <option value="">Select contamination status...</option>
              <option value="None">None</option>
              <option value="Nuclear">Nuclear</option>
              <option value="Biological">Biological</option>
              <option value="Chemical">Chemical</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <FieldError id="terrainDescription-error" message={errors.terrainDescription} />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="min-h-[26px] min-w-[90px] cursor-pointer rounded-[2px] bg-[#ffce00] px-[14px] py-1 text-[11px] tracking-[0.2px] text-black shadow-sm hover:bg-[#f4c400] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            SUBMIT
          </button>
        </div>
        {submitted && (
          <p role="status" className="-mt-[10px] text-[11px] text-[#333]">
            Form validated locally for testing. No request was transmitted.
          </p>
        )}
      </form>
    </div>
  );
}

export default MedevacForm;
