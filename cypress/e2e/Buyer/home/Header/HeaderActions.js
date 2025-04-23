import {HeaderLocators as headerLocators, HeaderLocators, HeaderValue} from "./headerConst";
import {Locators, URL} from "../../GlobalConst";
import {LocationLocators} from "../../Location/LocationConst";
import {GlobalStart} from "../../GlobalActions";
import {SignInLocators, SignInValue} from "../../Sing in/SignInConst";
import {SignIn} from "../../Sing in/SignInAction";


export class CheckHeader {
    Logo() {
        cy.get(HeaderLocators.Logo).should("be.visible")
    }

    Category() {
        cy.get(HeaderLocators.CategoryButton).should("be.visible")
    }

    Search() {
        cy.get(Locators.Search).should("be.visible")
    }

    SellOnUbird() {
        cy.get(HeaderLocators.SellOnUbird).should("be.visible")
    }

    Location() {
        cy.get(Locators.LocationIcon).should("be.visible")
    }

    Currency() {
        cy.get(HeaderLocators.currency).should("be.visible")
    }

    Language() {
        cy.get(HeaderLocators.language).should("be.visible")
    }

    Notification() {
        cy.get(Locators.NotificationIcon).should("be.visible")
    }

    Wishlist() {
        cy.get(Locators.WishlistIcon).should("be.visible")
    }

    ShoppingCard() {
        cy.get(Locators.ShoppingCardIcon).should("be.visible")
    }

    AccountIcon() {
        cy.get(Locators.AccountIcon).should("be.visible")
    }
}

export class HeaderClick {
    Logo() {
        cy.get(HeaderLocators.Logo).click()
        cy.url().should('eq', URL.BaseURLDev)
    }

    LogoRedirect() {
        cy.get(Locators.ShoppingCardIcon).click()
        cy.get(HeaderLocators.Logo).click()
        cy.url().should('eq', URL.BaseURLDev)
    }

    Category() {
        cy.get(HeaderLocators.CategoryButton).click()
        cy.get(HeaderLocators.CategoryDrawer).should("be.visible")
        cy.get(HeaderLocators.CategoryDrawerX).click()
        cy.get(HeaderLocators.CategoryDrawer).should('not.be.visible')
        cy.get(HeaderLocators.CategoryButton).click()
        cy.get(HeaderLocators.AllPageCategoryDrawer).click()
        cy.get(HeaderLocators.CategoryDrawer).should('not.be.visible')
    }

    Location() {
        cy.get(Locators.LocationIcon).click()
        cy.get(LocationLocators.LocationPage).should('be.visible')

    }

    Currency() {
        const currencies = [
            {label: HeaderValue.CurrencyAMD, code: HeaderValue.AMDCode},
            {label: HeaderValue.CurrencyKRW, code: HeaderValue.KRWCode},
            {label: HeaderValue.CurrencyUSD, code: HeaderValue.USDCode},
            {label: HeaderValue.CurrencyAED, code: HeaderValue.AEDCode},
            {label: HeaderValue.CurrencyCNY, code: HeaderValue.CNYCode},
            {label: HeaderValue.CurrencyEUR, code: HeaderValue.EURCode},
            {label: HeaderValue.CurrencyJPY, code: HeaderValue.JPYCode},
            {label: HeaderValue.CurrencyRUB, code: HeaderValue.RUBCode},
        ]
        cy.get(HeaderLocators.currency).eq(0).click()
        cy.get(HeaderLocators.CurrencyDropDown).should('be.visible')
        currencies.forEach(currency => {
            cy.contains(currency.label).should('exist');
        });
        currencies.forEach(currency => {
            cy.contains(currency.label).click()
            cy.get(HeaderLocators.currency).eq(0).should('contain', currency.code);
            cy.get(HeaderLocators.currency).eq(0).click();
        });
    }

    Languages() {
        cy.get(HeaderLocators.language).eq(0).click()
        cy.get(HeaderLocators.LanguageDropDown).should('be.visible')

        const languages = [
            {name: HeaderValue.Chinese, code: URL.ChineseURL},
            {name: HeaderValue.Armenian, code: URL.ArmenianURL},
            {name: HeaderValue.English, code: URL.EnglishURL},
            {name: HeaderValue.Arabic, code: URL.ArabicURL},
            {name: HeaderValue.Russian, code: URL.RussianURL},
        ]

        languages.forEach(language => {
            cy.get(HeaderLocators.language).eq(0).should('contain', language.name);
        });

        languages.forEach(language => {
            cy.get(HeaderLocators.language).eq(0).contains(language.name).click();
            cy.url().should('include', language.code);
            cy.get(HeaderLocators.language).eq(0).click();
        })
    }

    Notification() {
        cy.get(Locators.NotificationIcon).click()
        cy.get(SignInLocators.SignInPopUp).should('be.visible')
    }

    WishlistWithoutSignIn() {
        cy.get(Locators.WishlistIcon).click()
        cy.get(SignInLocators.SignInPopUp).should('be.visible')
        cy.url().should('include', URL.WishlistURLSignin)
    }

    ShoppingCard() {
        cy.get(Locators.ShoppingCardIcon).click()
        cy.url().should('include', URL.basketURL)
    }

    AccountWithoutSignIn() {
        cy.get(Locators.AccountIcon).click()
        cy.get(SignInLocators.SignInPopUp).should('be.visible')
        cy.url().should('include', URL.SignInURL)
    }

    WishlistWithSignIn() {
        cy.get(Locators.WishlistIcon).click()
        cy.url().should('include', URL.WishlistURL)
        cy.get(Locators.WishlistTitle).should('be.visible')
    }

    BecomeSeller() {
        cy.get(HeaderLocators.SellOnUbird).click()
        cy.origin('https://seller.ubird.com', () => {
            cy.url().should('include', 'https://seller.ubird.com');
        })

    }
}

export class CloseDropDown {
    Language() {
        cy.get(HeaderLocators.language).eq(0).click()
        cy.get(HeaderLocators.LanguageDropDown).should('be.visible')
        cy.get(HeaderLocators.language).eq(0).click()
        cy.get(HeaderLocators.LanguageDropDown).should('not.exist')
        cy.get(HeaderLocators.language).eq(0).click()
        cy.get(Locators.Header).click()
        cy.get(HeaderLocators.LanguageDropDown).should('not.exist')
    }

    Currency() {
        cy.get(HeaderLocators.currency).eq(0).click()
        cy.get(HeaderLocators.CurrencyDropDown).should('be.visible')
        cy.get(HeaderLocators.currency).eq(0).click()
        cy.get(HeaderLocators.CurrencyDropDown).should('not.exist')
        cy.get(HeaderLocators.currency).eq(0).click()
        cy.get(Locators.Header).click()
        cy.get(HeaderLocators.CurrencyDropDown).should('not.exist')
    }

    Notification() {
        cy.get(Locators.NotificationIcon).click() //այս մասը չի աշխատում, ֆիքսելուց հետո պետք է բացել
        cy.get(Locators.NotificationDropDown).should('be.visible')
        cy.get(Locators.NotificationIcon).click()
        cy.get(Locators.NotificationDropDown).should('not.exist')
        cy.get(Locators.NotificationIcon).click()
        cy.get(Locators.Header).click()
        cy.get(Locators.NotificationDropDown).should('not.exist')


    }

    Account() {
        cy.get(Locators.AccountIcon).click()
        cy.get(Locators.AccountDropDown).should('be.visible')
        cy.get(Locators.AccountIcon).click()//case-ը fail է գնում, իրականում պիտի էսպես աշխատի, բայց run-ին չծանգարելու համար մյուս տարբերակն եմ գրում, մինչև bug-ը ֆիքսվի
        cy.get(Locators.AccountDropDown).should('not.exist')
        cy.get(Locators.AccountIcon).click()
        cy.get(Locators.Header).click()
        cy.get(Locators.AccountDropDown).should('not.exist')
        cy.get(Locators.AccountIcon).click()
        cy.get(Locators.AccountProfile).click()
        cy.get(Locators.AccountDropDown).should('not.exist')
    }

}

export class CountIcons {
    checkIcon(iconLocator, countLocator) {
        cy.get(iconLocator).then(($icon) => {
            if ($icon.find(countLocator).length > 0) {
                cy.wrap($icon)
                    .find(countLocator)
                    .invoke('text')
                    .then((text) => {
                        const count = Number(text.replace('+', ''));
                        expect(count).to.be.greaterThan(0);
                    });
            } else {
                // Եթե count չկա, ապա ուղիղ icon-ի վրա ստուգիր որ count-ը չպետք է լինի
                cy.wrap($icon)
                    .find(countLocator)
                    .should('not.exist');
            }
        });
    }

    Notification() {
        this.checkIcon(Locators.NotificationIcon, Locators.Count);
    }

    Wishlist() {
        this.checkIcon(Locators.WishlistIcon, Locators.Count);
    }

    ShoppingCart() {
        this.checkIcon(Locators.ShoppingCardIcon, Locators.Count);
    }
}

export class LogOut {
    LogOutFunction() {
        cy.get(HeaderLocators.language).eq(0).click()
        cy.get('.modal__item').contains('Հայերեն').click()//երկիրը փոխելու ID-ն ունենալուց հետո փոխել այդ մասը հեռ․ համարի դաշտւ փոխելու ձևով
        cy.get(Locators.AccountIcon).click()
        cy.get(SignInLocators.SignInPopUp).should('be.visible')
        cy.get(SignInLocators.PhoneInput).type(SignInValue.PhoneNumber1)
        cy.get(SignInLocators.SignInButton).click()
        cy.get(SignInLocators.CodeInputs).should('be.visible')
        cy.get(SignInLocators.CodeNumber1).type(SignInValue.Code)
        cy.wait(3000) //wait-երը փոխարինել responce-ի հայտնվելով
        cy.get(Locators.AccountIcon).click()
        cy.get(Locators.AccountDropDown).should('be.visible')
        cy.get(Locators.LogOutButton).click()
        cy.get(SignInLocators.SignInPopUp).should('be.visible')
    }
}




