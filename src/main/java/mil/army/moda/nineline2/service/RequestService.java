
package mil.army.moda.nineline2.service;

import lombok.RequiredArgsConstructor;
import mil.army.moda.nineline2.entity.Request;
import mil.army.moda.nineline2.repository.RequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {

    private static RequestRepository requestRepository;

    public static Request createRequest(Request request) {
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
}

