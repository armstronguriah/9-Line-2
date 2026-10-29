import { useState, type ChangeEvent, type FormEvent } from "react";

interface MedevacFormData {
  location: string;
  callSign: string;
  patientNumber: number | "";
  precedence: string;
  specialEquipment: {
    none: boolean;
    hoist: boolean;
    extractionEquipment: boolean;
    ventilator: boolean;
  };
  litterPatients: number | "";
  ambulatoryPatients: number | "";
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

type FormErrors = Partial<Record<keyof MedevacFormData, string>>;
type CheckboxSection = "specialEquipment" | "methodOfPickup";

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
  name: keyof MedevacFormData["methodOfPickup"];
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
  if (!data.callSign.trim()) errors.callSign = "Required Field";
  if (data.patientNumber === "" || data.patientNumber < 1) {
    errors.patientNumber = "Enter at least 1 patient";
  }
  if (!data.precedence) errors.precedence = "Required Field";
  if (!Object.values(data.specialEquipment).some(Boolean)) {
    errors.specialEquipment = "Select at least one option";
  }
  // 0 is a valid patient-type count, but the user must select it explicitly.
  if (data.litterPatients === "") errors.litterPatients = "Required Field";
  if (data.ambulatoryPatients === "") errors.ambulatoryPatients = "Required Field";
  if (!data.security) errors.security = "Required Field";
  if (!Object.values(data.methodOfPickup).some(Boolean)) {
    errors.methodOfPickup = "Select at least one option";
  }
  if (!data.patientNationalityAndStatus) {
    errors.patientNationalityAndStatus = "Required Field";
  }
  if (!data.nbcContamination) errors.nbcContamination = "Required Field";

  return errors;
}

export function MedevacForm() {
  const [formData, setFormData] = useState<MedevacFormData>({
    location: "",
    callSign: "",
    patientNumber: "",
    precedence: "",
    specialEquipment: {
      none: false,
      hoist: false,
      extractionEquipment: false,
      ventilator: false,
    },
    litterPatients: "",
    ambulatoryPatients: "",
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

  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Once submission is attempted, errors update as the user corrects fields.
  const errors = showErrors ? validateForm(formData) : {};

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    const isNumber = ["patientNumber", "litterPatients", "ambulatoryPatients"].includes(name);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowErrors(true);

    if (Object.keys(validateForm(formData)).length > 0) {
      setSubmitted(false);
      return;
    }

    // UI demonstration only: do not send or store sensitive details in a console.
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
          <div className={fieldClass(errors.callSign)}>
            <label htmlFor="callSign" className={fieldLabel}>
              Radio Frequency/ Call Sign / Suffix
            </label>
            <input
              id="callSign"
              name="callSign"
              type="text"
              value={formData.callSign}
              onChange={handleInputChange}
              placeholder="(Call Sign)"
              className={fieldControl}
              aria-invalid={Boolean(errors.callSign)}
              aria-describedby={errors.callSign ? "callSign-error" : undefined}
            />
          </div>
          <FieldError id="callSign-error" message={errors.callSign} />
        </div>

        {/* Patient count and precedence */}
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
            <div className={fieldClass(errors.precedence)}>
              <label htmlFor="precedence" className={fieldLabel}>Precedence</label>
              <select
                id="precedence"
                name="precedence"
                value={formData.precedence}
                onChange={handleInputChange}
                className={`${fieldControl} cursor-pointer`}
                aria-invalid={Boolean(errors.precedence)}
                aria-describedby={errors.precedence ? "precedence-error" : undefined}
              >
                <option value="">Select Precedence...</option>
                <option value="Urgent">Urgent</option>
                <option value="Urgent-Surgical">Urgent-Surgical</option>
                <option value="Priority">Priority</option>
                <option value="Routine">Routine</option>
              </select>
            </div>
            <FieldError id="precedence-error" message={errors.precedence} />
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
            <div className={fieldClass(errors.litterPatients)}>
              <label htmlFor="litterPatients" className={fieldLabel}>Litter Patient #</label>
              <select
                id="litterPatients"
                name="litterPatients"
                value={formData.litterPatients}
                onChange={handleInputChange}
                className={`${fieldControl} cursor-pointer`}
                aria-invalid={Boolean(errors.litterPatients)}
                aria-describedby={errors.litterPatients ? "litterPatients-error" : undefined}
              >
                <option value="">Select count...</option>
                {Array.from({ length: 11 }, (_, count) => (
                  <option value={count} key={count}>{count}</option>
                ))}
              </select>
            </div>
            <FieldError id="litterPatients-error" message={errors.litterPatients} />
          </div>
          <div className="min-w-0 flex-1">
            <div className={fieldClass(errors.ambulatoryPatients)}>
              <label htmlFor="ambulatoryPatients" className={fieldLabel}>Ambulatory Patient #</label>
              <select
                id="ambulatoryPatients"
                name="ambulatoryPatients"
                value={formData.ambulatoryPatients}
                onChange={handleInputChange}
                className={`${fieldControl} cursor-pointer`}
                aria-invalid={Boolean(errors.ambulatoryPatients)}
                aria-describedby={errors.ambulatoryPatients ? "ambulatoryPatients-error" : undefined}
              >
                <option value="">Select count...</option>
                {Array.from({ length: 11 }, (_, count) => (
                  <option value={count} key={count}>{count}</option>
                ))}
              </select>
            </div>
            <FieldError id="ambulatoryPatients-error" message={errors.ambulatoryPatients} />
          </div>
        </div>

        {/* Security */}
        <div className="min-w-0">
          <div className={fieldClass(errors.security)}>
            <label htmlFor="security" className={fieldLabel}>Security at Pick-Up Site</label>
            <select
              id="security"
              name="security"
              value={formData.security}
              onChange={handleInputChange}
              className={`${fieldControl} cursor-pointer`}
              aria-invalid={Boolean(errors.security)}
              aria-describedby={errors.security ? "security-error" : undefined}
            >
              <option value="">Select security status...</option>
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
          <FieldError id="security-error" message={errors.security} />
        </div>

        {/* Pick-up site marking */}
        <fieldset className="-mt-[2px] min-w-0 border-0 p-0" aria-describedby={errors.methodOfPickup ? "methodOfPickup-error" : undefined}>
          <legend className={`${groupLegend} ${errors.methodOfPickup ? "text-[#c94545]" : ""}`}>
            Method of Marking Pick-up Site
          </legend>
          {pickupOptions.map(({ name, label }) => (
            <label key={name} className={checkboxLabel}>
              <input
                type="checkbox"
                name={name}
                checked={formData.methodOfPickup[name]}
                onChange={(event) => handleCheckboxChange("methodOfPickup", event)}
                className={checkboxInput}
              />
              {label}
            </label>
          ))}
          <FieldError id="methodOfPickup-error" message={errors.methodOfPickup} />
        </fieldset>

        {/* Patient nationality and status */}
        <div className="min-w-0">
          <div className={fieldClass(errors.patientNationalityAndStatus)}>
            <label htmlFor="patientNationalityAndStatus" className={fieldLabel}>
              Patient Nationality and Status
            </label>
            <select
              id="patientNationalityAndStatus"
              name="patientNationalityAndStatus"
              value={formData.patientNationalityAndStatus}
              onChange={handleInputChange}
              className={`${fieldControl} cursor-pointer`}
              aria-invalid={Boolean(errors.patientNationalityAndStatus)}
              aria-describedby={errors.patientNationalityAndStatus ? "nationality-error" : undefined}
            >
              <option value="">Select nationality/status...</option>
              <option value="US Military">US Military</option>
              <option value="US Civilian">US Civilian</option>
              <option value="Non-US Military">Non-US Military</option>
              <option value="Non-US Civilian">Non-US Civilian</option>
              <option value="Enemy Prisoner of War">Enemy Prisoner of War</option>
            </select>
          </div>
          <FieldError id="nationality-error" message={errors.patientNationalityAndStatus} />
        </div>

        {/* NBC contamination */}
        <div className="min-w-0">
          <div className={fieldClass(errors.nbcContamination)}>
            <label htmlFor="nbcContamination" className={fieldLabel}>NBC Contamination</label>
            <select
              id="nbcContamination"
              name="nbcContamination"
              value={formData.nbcContamination}
              onChange={handleInputChange}
              className={`${fieldControl} cursor-pointer`}
              aria-invalid={Boolean(errors.nbcContamination)}
              aria-describedby={errors.nbcContamination ? "nbcContamination-error" : undefined}
            >
              <option value="">Select contamination status...</option>
              <option value="None">None</option>
              <option value="Nuclear">Nuclear</option>
              <option value="Biological">Biological</option>
              <option value="Chemical">Chemical</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <FieldError id="nbcContamination-error" message={errors.nbcContamination} />
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
