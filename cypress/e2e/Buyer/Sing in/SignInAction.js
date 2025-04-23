import {SignInLocators, SignInValue} from "./SignInConst";
import {Locators, URL} from "../GlobalConst";
import {HeaderLocators} from "../home/Header/headerConst";




export class SignIn {
    ValidCredentials() {
        cy.get(HeaderLocators.language).eq(0).click()
        cy.get('.modal__item').contains('Հայերեն').click()//երկիրը փոխելու ID-ն ունենալուց հետո փոխել այդ մասը հեռ․ համարի դաշտւ փոխելու ձևով
        cy.get(Locators.AccountIcon).click()
        cy.get(SignInLocators.SignInPopUp).should('be.visible')
        cy.get(SignInLocators.PhoneInput).type(SignInValue.PhoneNumber1)
        cy.get(SignInLocators.SignInButton).click()
        cy.get(SignInLocators.CodeInputs).should('be.visible')
        cy.get(SignInLocators.CodeNumber1).type (SignInValue.Code)
        cy.wait(3000) //wait-երը փոխարինել responce-ի հայտնվելով
        cy.get(Locators.AccountIcon).click()
        cy.get(Locators.AccountDropDown).should('be.visible')
        // cy.get(Locators.AccountIcon).click()//case-ը fail է գնում, իրականում պիտի էսպես աշխատի, բայց run-ին չծանգարելու համար մյուս տարբերակն եմ գրում, մինչև bug-ը ֆիքսվի
        cy.get(Locators.Header).click() //պետք է հետո ջնջել



    }
}
