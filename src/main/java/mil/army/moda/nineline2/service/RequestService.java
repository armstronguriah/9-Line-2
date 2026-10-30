package mil.army.moda.nineline2.service;

import lombok.RequiredArgsConstructor;
import mil.army.moda.nineline2.entity.Request;
import mil.army.moda.nineline2.repository.RequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RequestService {

    // Remove 'static' so Lombok/Spring can inject the bean
    private final RequestRepository requestRepository;

    public Request createRequest(Request request) {
        return requestRepository.save(request);
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Request getRequestById(Long id) {
        return requestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Request not found: " + id));
    }

    public Optional <Request> updateRequest(Long id, Request request) {
        Optional<Request> requestOptional = requestRepository.findById(id);
        if (requestOptional.isEmpty()) {
            return Optional.empty();
        }
        Request currentRequest = requestOptional.get();
        currentRequest.setLocation(request.getLocation());
        currentRequest.setRadiofreq(request.getRadiofreq());
        currentRequest.setPatientPrecedence(request.getPatientPrecedence());
        currentRequest.setPatientNumber(request.getPatientNumber());
        currentRequest.setPatientPrecedence(request.getPatientPrecedence());
        currentRequest.setSpecialEquipment(request.getSpecialEquipment());
        currentRequest.setPatientLitter(request.getPatientLitter());
        currentRequest.setPatientAmbulatory(request.getPatientAmbulatory());
        currentRequest.setSiteSecurity(request.getSiteSecurity());
        currentRequest.setSiteMarking(request.getSiteMarking());
        currentRequest.setPatientNationalityStatus(request.getPatientNationalityStatus());
        currentRequest.setTerrainDescription(request.getTerrainDescription());
        Request savedRequest = requestRepository.save(currentRequest);
        return Optional.of (savedRequest);
    }
}