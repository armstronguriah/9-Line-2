package mil.army.moda.nineline2.controller;

import mil.army.moda.nineline2.entity.Request;
import mil.army.moda.nineline2.service.RequestService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.json.JsonMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RequestController.class)
class RequestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    RequestService requestService;

    @Autowired
    JsonMapper jsonMapper;


    @Test
    void createRequest() throws Exception {
        //Arrange
        Request request = new Request(1L, "MGRS12345", "12345", "1", "none", "amb", "none", "VS-17 Panels", "U.S.", "None");
        //Act
        when(RequestService.createRequest(any(Request.class))).thenReturn(request);
        //Assert
        mockMvc.perform(post("/api/requests")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(requestService, times(1));
        RequestService.createRequest(any(Request.class));
    }

    @Test
    void getAllRequests() {






    }

    @Test
    void getRequestById() {
    }
}
