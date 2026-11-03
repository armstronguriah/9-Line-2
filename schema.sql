INSERT INTO medevac_request (
    location,
    patient_ambulatory,
    patient_litter,
    patient_nationality_status,
    patient_number,
    patient_precedence,
    radio_freq,
    site_marking,
    site_security,
    special_equipment,
    terrain_description,
    status
) VALUES (
             'Grid Zone 32U', -- location
             0,               -- patient_ambulatory
             1,               -- patient_litter
             'US Military',   -- patient_nationality_status
             1,               -- patient_number
             'URGENT',        -- patient_precedence
             '34.50 MHz',     -- radio_freq
             'Smoke',         -- site_marking
             'Secure',        -- site_security
             'Hoist',         -- special_equipment
             'Dense Forest',  -- terrain_description
             'pending'        -- status
         );
