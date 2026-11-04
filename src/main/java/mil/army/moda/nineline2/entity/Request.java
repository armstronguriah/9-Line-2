
package mil.army.moda.nineline2.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "medevac_request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Line 1: Pickup location
    @NotBlank
    @Column(nullable = false)
    private String location;

    // Line 2: Radio frequency, call sign, and suffix
    @NotBlank
    @Column(nullable = false)
    private String radioFreq;

    // Line 3a: # of Patients
    @NotNull
    @Column(nullable = false)
    private Integer patientNumber;

    // Line 3b: Patients by precedence
    @NotBlank
    @Column(nullable = false)
    private String patientPrecedence;

    // Line 4: Special equipment required
    @NotBlank
    @Column(nullable = false)
    private String specialEquipment;

    // Line 5a: Patients Litter
    @NotNull
    @Column(nullable = false)
    private Integer patientLitter;

    // Line 5b: Patients Ambulatory
    @NotNull
    @Column(nullable = false)
    private Integer patientAmbulatory;

    // Line 6: Security at pickup site
    @NotBlank
    @Column(nullable = false)
    private String siteSecurity;

    // Line 7: Method of marking pickup site
    @NotBlank
    @Column(nullable = false)
    private String siteMarking;

    // Line 8: Patient nationality and status
    @NotBlank
    @Column(nullable = false)
    private String patientNationalityStatus;

    // Line 9: Terrain description or obstacles
    @NotBlank
    @Column(nullable = false)
    private String terrainDescription;

    @NotBlank
    @Column(nullable = false)
    private String status = "PENDING";

//    public Request(Long id, String location, String radioFreq, Integer patientNumber, String patientPrecedence, String specialEquipment, Integer patientLitter, Integer patientAmbulatory, String siteSecurity, String siteMarking, String patientNationalityStatus, String terrainDescription) {
//    }


    //     public Request(Long id, String location, String radioFreq, Integer patientNumber, String patientPrecedence, String patientNationalityStatus, String siteMarking, String siteSecurity, String terrainDescription, Integer patientLitter, Integer patientAmbulatory, String specialEquipment) {
//
//}

    @Override
    public String toString() {
        return "Request{" +
                "id=" + id +
                ", location='" + location + '\'' +
                ", radioFreq='" + radioFreq + '\'' +
                ", patientNumber=" + patientNumber +
                ", patientPrecedence='" + patientPrecedence + '\'' +
                ", specialEquipment='" + specialEquipment + '\'' +
                ", patientLitter=" + patientLitter +
                ", patientAmbulatory=" + patientAmbulatory +
                ", siteSecurity='" + siteSecurity + '\'' +
                ", siteMarking='" + siteMarking + '\'' +
                ", patientNationalityStatus='" + patientNationalityStatus + '\'' +
                ", terrainDescription='" + terrainDescription + '\'' +
                '}';
    }
}