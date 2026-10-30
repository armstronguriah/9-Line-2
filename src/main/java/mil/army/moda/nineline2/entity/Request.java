
package mil.army.moda.nineline2.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
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

    public Request() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRadioFreq() {
        return radioFreq;
    }

    public void setRadioFreq(String radioFreq) {
        this.radioFreq = radioFreq;
    }

    public Integer getPatientNumber() {
        return patientNumber;
    }

    public void setPatientNumber(Integer patientNumber) {
        this.patientNumber = patientNumber;
    }

    public String getPatientPrecedence() {
        return patientPrecedence;
    }

    public void setPatientPrecedence(String patientPrecedence) {
        this.patientPrecedence = patientPrecedence;
    }

    public String getSpecialEquipment() {
        return specialEquipment;
    }

    public void setSpecialEquipment(String specialEquipment) {
        this.specialEquipment = specialEquipment;
    }

    public Integer getPatientLitter() {
        return patientLitter;
    }

    public void setPatientLitter(Integer patientLitter) {
        this.patientLitter = patientLitter;
    }

    public Integer getPatientAmbulatory() {
        return patientAmbulatory;
    }

    public void setPatientAmbulatory(Integer patientAmbulatory) {
        this.patientAmbulatory = patientAmbulatory;
    }

    public String getSiteSecurity() {
        return siteSecurity;
    }

    public void setSiteSecurity(String siteSecurity) {
        this.siteSecurity = siteSecurity;
    }

    public String getSiteMarking() {
        return siteMarking;
    }

    public void setSiteMarking(String siteMarking) {
        this.siteMarking = siteMarking;
    }

    public String getPatientNationalityStatus() {
        return patientNationalityStatus;
    }

    public void setPatientNationalityStatus(String patientNationalityStatus) {
        this.patientNationalityStatus = patientNationalityStatus;
    }

    public String getTerrainDescription() {
        return terrainDescription;
    }

    public void setTerrainDescription(String terrainDescription) {
        this.terrainDescription = terrainDescription;
    }

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