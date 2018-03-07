package com.myage.contacts_app_mono.service.mapper;

import com.myage.contacts_app_mono.domain.*;
import com.myage.contacts_app_mono.service.dto.EmailDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Email and its DTO EmailDTO.
 */
@Mapper(componentModel = "spring", uses = {ContactMapper.class})
public interface EmailMapper extends EntityMapper<EmailDTO, Email> {

    @Mapping(source = "contact.id", target = "contactId")
    EmailDTO toDto(Email email);

    @Mapping(source = "contactId", target = "contact")
    Email toEntity(EmailDTO emailDTO);

    default Email fromId(Long id) {
        if (id == null) {
            return null;
        }
        Email email = new Email();
        email.setId(id);
        return email;
    }
}
