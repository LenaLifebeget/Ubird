import {Locators, URL} from "./GlobalConst";


export class GlobalStart {
    visit() {
        cy.visit(URL.BaseUrlPassword);
    }

    closeCookie() {
        cy.get(Locators.CookieButton).click();
    }
}

