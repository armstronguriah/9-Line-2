package mil.army.moda.nineline2.controller;

import mil.army.moda.nineline2.entity.Request;

public class RequestBuilder {
    private Long id;
    private String location ;
    private String radioFreq;
    private Integer patientNumber;
    private String patientPrecedence ;
    private String specialEquipment;
    private Integer patientLitter;
    private Integer patientAmbulatory;
    private String siteSecurity;
    private String siteMarking;
    private String patientNationalityStatus;
    private String terrainDescription;


    public static RequestBuilder request() {
        return new RequestBuilder();

    }

    public RequestBuilder withId(Long id) {
        this.id = id;
        return this;

    }

    public RequestBuilder withLocation(String location) {
        this.location = location;
        return this;

    }

    public RequestBuilder withRadioFreq(String radioFreq) {
        this.radioFreq = radioFreq;
        return this;
    }

    public RequestBuilder withPatientNumber(Integer patientNumber) {
        this.patientNumber = patientNumber;
        return this;
    }
    public RequestBuilder withPatientPrecedence(String patientPrecedence) {
        this.patientPrecedence = patientPrecedence;
        return this;
    }

    public RequestBuilder withSiteSecurity(String siteSecurity) {
        this.siteSecurity = siteSecurity;
        return this;
    }
    public RequestBuilder withSiteMarking(String siteMarking) {
        this.siteMarking = siteMarking;
        return this;
    }
    public RequestBuilder withPatientNationalityStatus(String patientNationalityStatus) {
        this.patientNationalityStatus = patientNationalityStatus;
        return this;
    }
    public RequestBuilder withTerrainDescription(String terrainDescription) {
        this.terrainDescription = terrainDescription;
        return this;
    }

    public RequestBuilder withPatientLitter(Integer patientLitter) {
        this.patientLitter = patientLitter;
        return this;
    }

    public RequestBuilder withPatientAmbulatory(Integer patientAmbulatory) {
        this.patientAmbulatory = patientAmbulatory;
        return this;
    }

    public RequestBuilder withSpecialEquipment(String specialEquipment) {
        this.specialEquipment = specialEquipment;
        return this;
    }

    public Request build() {
        return new Request(
                this.id,
                this.location,
                this.radioFreq,
                this.patientNumber,
                this.patientPrecedence,
                this.specialEquipment,
                this.patientLitter,
                this.patientAmbulatory,
                this.siteSecurity,
                this.siteMarking,
                this.patientNationalityStatus,
                this.terrainDescription);

    }


}

