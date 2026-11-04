package mil.army.moda.nineline2.controller;

import mil.army.moda.nineline2.entity.Request;
import mil.army.moda.nineline2.service.RequestService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.json.JsonMapper;

import java.util.List;
import java.util.Optional;

import static mil.army.moda.nineline2.controller.RequestBuilder.request;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.hamcrest.Matchers.matchesPattern;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RequestController.class)
class RequestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    RequestService requestService;

    @Autowired
    JsonMapper jsonMapper;

    @Captor
    ArgumentCaptor<Request> requestCaptor = ArgumentCaptor.forClass(Request.class);


    @Test
    void createRequest() throws Exception {

        var request=request()
                .withId(1L)
                .withLocation("32UPA1234567890")
                .withPatientNationalityStatus("US")
                .withPatientNumber(1)
                .withPatientPrecedence("URG")
                .withRadioFreq("3445")
                .withSiteMarking("Panels")
                .withSiteSecurity("yes")
                .withTerrainDescription("mountains")
                .withPatientLitter(1)
                .withPatientAmbulatory(2)
                .withSpecialEquipment("none")
                .withStatus("PENDING")
                .build();
        //Arrange
    //  Request request = new Request(1L, "32UPA1234567890", "12345", 1, "Urgent", "none", 1, 2, "none", "VS-17 Panels", "U.S.", "None");
        //Act
        when(requestService.createRequest(any(Request.class))).thenReturn(request);
        //Assert
        mockMvc.perform(post("/api/requests")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMapper.writeValueAsString(request)));
//                .andExpect(status().isCreated());

        verify(requestService, only()).createRequest(requestCaptor.capture());
        assertThat(requestCaptor.getValue()).usingRecursiveComparison().isEqualTo(request);
        verify(requestService,times(1)).createRequest(any(Request.class));
    }

    @Test
    void getAllRequests() throws Exception {
        List<Request> allRequests = List.of(request().withId(3L).build(),  request().withId(45L).build());

        when(requestService.getAllRequests()).thenReturn(allRequests);

        mockMvc.perform(get("/api/requests")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

        verify(requestService, times(1)).getAllRequests();
    }

    @Test
    void getRequestById() throws Exception {

        var requestById=request()
                .withId(1L)
                .build();

        when(requestService.getRequestById(anyLong())).thenReturn(requestById);

        mockMvc.perform(get("/api/requests/" + requestById.getId()))

                .andExpect(status().isOk());

        verify(requestService, times(1)).getRequestById(anyLong());

    }
    @Test
    void updateRequest() throws Exception {
        var existingRequest=request()
                .withId(1L)
                .withLocation("32UPA1234567890")
                .withPatientNationalityStatus("US")
                .withPatientNumber(1)
                .withPatientPrecedence("URG")
                .withRadioFreq("3445")
                .withSiteMarking("Panels")
                .withSiteSecurity("yes")
                .withTerrainDescription("mountains")
                .withPatientLitter(1)
                .withPatientAmbulatory(2)
                .withSpecialEquipment("none")
                .withStatus("PENDING")
                .build();
        var updateRequest=request()
                .withId(1L)
                .withLocation("32UPA123450000")
                .withPatientNationalityStatus("US")
                .withPatientNumber(1)
                .withPatientPrecedence("URG")
                .withRadioFreq("3445")
                .withSiteMarking("Panels")
                .withSiteSecurity("yes")
                .withTerrainDescription("mountains")
                .withPatientLitter(1)
                .withPatientAmbulatory(2)
                .withSpecialEquipment("none")
                .withStatus("ACTIVE")
                .build();

        when(requestService.updateRequest(eq(1L),any(Request.class))).thenReturn(Optional.ofNullable(updateRequest));


        mockMvc.perform(patch("/api/requests/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonMapper.writeValueAsString(existingRequest)))
                        .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.location").value(matchesPattern("32UPA123450000")));

        verify(requestService, times(1)).updateRequest(any(), any(Request.class));

    }
    @Test
    void deleteRequestByID() throws Exception {
        var requestById = request()
                .withId(1L)
                .build();

      //  when(requestService.removeRequestByID(anyLong()));

        mockMvc.perform(delete("/api/requests/" + requestById.getId())
              .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMapper.writeValueAsString(1L)))
                .andExpect(status().isNoContent());

        verify(requestService, times(1)).removeRequestByID(anyLong());
    }}

