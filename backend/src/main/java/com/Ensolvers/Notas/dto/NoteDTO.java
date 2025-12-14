package com.Ensolvers.Notas.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDTO {

    @NotBlank(message = "El título es obligatorio")
    private String title;

    private String content;
}