package com.myage.contacts_app_mono.service.mapper;

import com.myage.contacts_app_mono.domain.*;
import com.myage.contacts_app_mono.service.dto.PhoneDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Phone and its DTO PhoneDTO.
 */
@Mapper(componentModel = "spring", uses = {ContactMapper.class})
public interface PhoneMapper extends EntityMapper<PhoneDTO, Phone> {

    @Mapping(source = "contact.id", target = "contactId")
    PhoneDTO toDto(Phone phone);

    @Mapping(source = "contactId", target = "contact")
    Phone toEntity(PhoneDTO phoneDTO);

    default Phone fromId(Long id) {
        if (id == null) {
            return null;
        }
        Phone phone = new Phone();
        phone.setId(id);
        return phone;
    }
}
