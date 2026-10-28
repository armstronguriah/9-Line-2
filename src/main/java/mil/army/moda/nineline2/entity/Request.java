
package mil.army.moda.nineline2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "medevac_request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Line 1: Pickup location
    private String location;

    // Line 2: Radio frequency, call sign, and suffix
    private String radiofreq;

    // Line 3: Patients by precedence
    private String patientPrecedence;

    // Line 4: Special equipment required
    private String specialEquipment;

    // Line 5: Patients by type
    private String patientType;

    // Line 6: Security at pickup site
    private String siteSecurity;

    // Line 7: Method of marking pickup site
    private String siteMarking;

    // Line 8: Patient nationality and status
    private String patientNationalityStatus;

    // Line 9: Terrain description or obstacles
    private String terrainDescription;
}
