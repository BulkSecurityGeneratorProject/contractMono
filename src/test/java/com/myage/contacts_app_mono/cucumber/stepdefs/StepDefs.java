package com.myage.contacts_app_mono.cucumber.stepdefs;

import com.myage.contacts_app_mono.ContractMonoApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = ContractMonoApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
