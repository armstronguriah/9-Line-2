package mil.army.moda.nineline2.controller;

import jakarta.validation.Valid;
import mil.army.moda.nineline2.entity.Request;
import mil.army.moda.nineline2.service.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PatchMapping("/{id}")
    public ResponseEntity<Optional<Request>> updateRequest(@PathVariable Long id, @RequestBody Request request) {

        return ResponseEntity.ok(requestService.updateRequest(id, request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        requestService.removeRequestByID(id);
        return ResponseEntity.noContent().build();

    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<Request> updateStatus(
            @PathVariable Long id,
            @RequestBody String status) {

        var updatedRequest = requestService.updateStatus(id, status);

        return updatedRequest
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}