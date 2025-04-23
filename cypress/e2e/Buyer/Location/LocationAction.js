import {LocationLocators} from "./LocationConst";

export class LocationAlert {
    CloseAlert() {
        cy.on('window:alert', (text) => {
            expect(text).to.include('Вы находитесь в Армении. Пункты выдачи доступны.');
        });
    }
}

export class LocationPage {
    LocationMap() {
        cy.wait(7000) //wait-երը փոխարինել responce-ի հայտնվելով
        cy.get(LocationLocators.YandexMap).should('be.visible')
        cy.get(LocationLocators.DelivaryMethodes).should('be.visible')
        cy.get(LocationLocators.CloseMapButton).click()
    }

}