
package mil.army.moda.nineline2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    public String getRadiofreq() {
        return radiofreq;
    }

    public void setRadiofreq(String radiofreq) {
        this.radiofreq = radiofreq;
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

    public String getPatientType() {
        return patientType;
    }

    public void setPatientType(String patientType) {
        this.patientType = patientType;
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
                ", radiofreq='" + radiofreq + '\'' +
                ", patientPrecedence='" + patientPrecedence + '\'' +
                ", specialEquipment='" + specialEquipment + '\'' +
                ", patientType='" + patientType + '\'' +
                ", siteSecurity='" + siteSecurity + '\'' +
                ", siteMarking='" + siteMarking + '\'' +
                ", patientNationalityStatus='" + patientNationalityStatus + '\'' +
                ", terrainDescription='" + terrainDescription + '\'' +
                '}';
    }
}
