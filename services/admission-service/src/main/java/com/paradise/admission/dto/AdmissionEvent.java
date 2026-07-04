package com.paradise.admission.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdmissionEvent {
    private Long id;
    private String applicationNumber;
    private String childFirstName;
    private String childLastName;
    private String parentName;
    private String parentEmail;
    private String parentPhone;
    private String applyingFor;
}
