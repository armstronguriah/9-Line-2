package mil.army.moda.nineline2.controller;


import lombok.AllArgsConstructor;
import mil.army.moda.nineline2.service.RequestService;
import org.apache.catalina.connector.Request;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping("/api/requests")


public class requestController {

    private final RequestService requestService;

    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        Request newRequest = requestService.createRequest(request);
        return new ResponseEntity<>(newRequest, HttpStatus.CREATED);
    }
}
