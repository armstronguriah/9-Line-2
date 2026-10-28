package mil.army.moda.nineline2.service;

import lombok.AllArgsConstructor;
import mil.army.moda.nineline2.entity.Requester;
import mil.army.moda.nineline2.repository.requestRepository;
import org.apache.catalina.connector.Request;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class RequestService {
    private final RequestRepository requestRepository;

    public Request createRequest(Request request) {
        return requestRepository.save(request);
    }

}


