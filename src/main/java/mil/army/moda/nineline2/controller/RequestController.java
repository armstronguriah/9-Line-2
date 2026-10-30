package mil.army.moda.nineline2.controller;

import jakarta.validation.Valid;
import mil.army.moda.nineline2.entity.Request;
import mil.army.moda.nineline2.service.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:3000")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    // Create a new MEDEVAC request
    @PostMapping
    public ResponseEntity<Request> createRequest(@Valid @RequestBody Request request) {
        Request newRequest = requestService.createRequest(request);
        return new ResponseEntity<>(newRequest, HttpStatus.CREATED);
    }

    // Retrieve all MEDEVAC requests
    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    // Retrieve a MEDEVAC request by ID
    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(@Valid @PathVariable("id") Long id, @RequestBody Request request) {
        Request changes;
        changes = requestService.getRequestById(id);
        changes.setLocation(request.getLocation());
        changes.setRadiofreq(request.getRadiofreq());
        changes.setPatientNumber(request.getPatientNumber());
        changes.setPatientPrecedence(request.getPatientPrecedence());
        changes.setSpecialEquipment(request.getSpecialEquipment());
        changes.setPatientLitter(request.getPatientLitter());
        changes.setPatientAmbulatory(request.getPatientAmbulatory());
        changes.setSiteSecurity(request.getSiteSecurity());
        changes.setSiteMarking(request.getSiteMarking());
        changes.setPatientNationalityStatus(request.getPatientNationalityStatus());
        changes.setTerrainDescription(request.getTerrainDescription());
        return ResponseEntity.of(requestService.updateRequest(id, changes));
    }
}