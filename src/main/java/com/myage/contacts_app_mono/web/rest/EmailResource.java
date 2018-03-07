package com.myage.contacts_app_mono.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.myage.contacts_app_mono.domain.Email;

import com.myage.contacts_app_mono.repository.EmailRepository;
import com.myage.contacts_app_mono.web.rest.errors.BadRequestAlertException;
import com.myage.contacts_app_mono.web.rest.util.HeaderUtil;
import com.myage.contacts_app_mono.web.rest.util.PaginationUtil;
import com.myage.contacts_app_mono.service.dto.EmailDTO;
import com.myage.contacts_app_mono.service.mapper.EmailMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Email.
 */
@RestController
@RequestMapping("/api")
public class EmailResource {

    private final Logger log = LoggerFactory.getLogger(EmailResource.class);

    private static final String ENTITY_NAME = "email";

    private final EmailRepository emailRepository;

    private final EmailMapper emailMapper;

    public EmailResource(EmailRepository emailRepository, EmailMapper emailMapper) {
        this.emailRepository = emailRepository;
        this.emailMapper = emailMapper;
    }

    /**
     * POST  /emails : Create a new email.
     *
     * @param emailDTO the emailDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emailDTO, or with status 400 (Bad Request) if the email has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/emails")
    @Timed
    public ResponseEntity<EmailDTO> createEmail(@RequestBody EmailDTO emailDTO) throws URISyntaxException {
        log.debug("REST request to save Email : {}", emailDTO);
        if (emailDTO.getId() != null) {
            throw new BadRequestAlertException("A new email cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Email email = emailMapper.toEntity(emailDTO);
        email = emailRepository.save(email);
        EmailDTO result = emailMapper.toDto(email);
        return ResponseEntity.created(new URI("/api/emails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /emails : Updates an existing email.
     *
     * @param emailDTO the emailDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emailDTO,
     * or with status 400 (Bad Request) if the emailDTO is not valid,
     * or with status 500 (Internal Server Error) if the emailDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/emails")
    @Timed
    public ResponseEntity<EmailDTO> updateEmail(@RequestBody EmailDTO emailDTO) throws URISyntaxException {
        log.debug("REST request to update Email : {}", emailDTO);
        if (emailDTO.getId() == null) {
            return createEmail(emailDTO);
        }
        Email email = emailMapper.toEntity(emailDTO);
        email = emailRepository.save(email);
        EmailDTO result = emailMapper.toDto(email);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emailDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /emails : get all the emails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emails in body
     */
    @GetMapping("/emails")
    @Timed
    public ResponseEntity<List<EmailDTO>> getAllEmails(Pageable pageable) {
        log.debug("REST request to get a page of Emails");
        Page<Email> page = emailRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/emails");
        return new ResponseEntity<>(emailMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /emails/:id : get the "id" email.
     *
     * @param id the id of the emailDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emailDTO, or with status 404 (Not Found)
     */
    @GetMapping("/emails/{id}")
    @Timed
    public ResponseEntity<EmailDTO> getEmail(@PathVariable Long id) {
        log.debug("REST request to get Email : {}", id);
        Email email = emailRepository.findOne(id);
        EmailDTO emailDTO = emailMapper.toDto(email);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emailDTO));
    }

    /**
     * DELETE  /emails/:id : delete the "id" email.
     *
     * @param id the id of the emailDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/emails/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmail(@PathVariable Long id) {
        log.debug("REST request to delete Email : {}", id);
        emailRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
