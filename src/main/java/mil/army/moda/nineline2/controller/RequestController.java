package mil.army.moda.nineline2.controller;

import lombok.RequiredArgsConstructor;
import mil.army.moda.nineline2.entity.Request;
import mil.army.moda.nineline2.service.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor // Lombok generates the constructor for all final fields automatically!
public class RequestController {

    private final RequestService requestService;

    // Create a new MEDEVAC request
    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
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
}