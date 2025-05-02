import {SearchConst, SearchLocators} from './SearchConst';
import {Locators} from "../GlobalConst";


function levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            matrix[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
                ? matrix[i - 1][j - 1]
                : Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
        }
    }

    return matrix[b.length][a.length];
}

function hasSimilarSubstring(query, text, maxDistance = 2) {
    query = query.toLowerCase();
    text = text.toLowerCase();

    for (let i = 0; i <= text.length - query.length; i++) {
        const substr = text.slice(i, i + query.length);
        if (levenshtein(query, substr) <= maxDistance) {
            return true;
        }
    }
    return false;
}

export class SearchInput {
    ValidData() {
        cy.get(Locators.Search).click().should('be.focused');
        cy.get(Locators.Search).type(SearchConst.ValueA);
        cy.get(SearchLocators.AutocompleteSuggestion)
            .should('be.visible')
            .each(($el) => {
                cy.wrap($el)
                    .invoke('text')
                    .then((text) => {
                        expect(text.toLowerCase().trim()).to.include(SearchConst.ValueA.toLowerCase().trim());
                    });
            });
    }

    InvalidData() {
        cy.get(Locators.Search).type(SearchConst.InvalidValue);
        cy.get(SearchLocators.AutocompleteSuggestion).should('contain', SearchConst.InvalidValue);
    }

    DeleteData() {
        cy.get(Locators.Search).clear();
        cy.get(Locators.Search).should('have.value', '');
    }

    CheckImage() {
        cy.get(Locators.Search).type(SearchConst.ValueB);
        cy.get(SearchLocators.AutocompleteSuggestion).should('be.visible');
        cy.get('.autocomplete-items__item img').should('be.visible');
        cy.get('.autocomplete-items__item img').each(($img) => {
            const src = $img.attr('src');
            expect(src).to.match(/^https?:\/\/.+\..+/);
        });
    }

    PartialSearch() {
        const userInput = SearchConst.HalfValue.toLowerCase();
        cy.get(Locators.Search).clear().type(userInput);
        cy.wait(2000);

        cy.get(SearchLocators.AutocompleteSuggestion).each(($el) => {
            const suggestionText = $el.text().toLowerCase();
            const match = hasSimilarSubstring(userInput, suggestionText, 2);
            expect(match, `No close substring found in "${suggestionText}" for input "${userInput}"`).to.be.true;
        });
    }

    PartialSearch_MultiLang() {
        const SearchWords = {
            hy: SearchConst.ValueHy,
            en: SearchConst.ValueEn,
            ru: SearchConst.ValueRu,
            zh: SearchConst.ValueZh,
            ar: SearchConst.ValueAr,
        };

        Object.entries(SearchWords).forEach(([lang, word]) => {
            cy.get(Locators.Search).clear().type(word);
            cy.wait(2000);

            cy.get(SearchLocators.AutocompleteSuggestion).then($list => {
                let foundMatch = false;
                const allTranslations = Object.values(SearchWords);

                $list.each((index, el) => {
                    const suggestionText = el.innerText.toLowerCase();
                    for (const trans of allTranslations) {
                        if (hasSimilarSubstring(trans, suggestionText, 2)) {
                            foundMatch = true;
                        }
                    }
                });

                expect(foundMatch, `❌ No matching suggestion found for "${word}" [${lang}]`).to.be.true;
            });
        });
    }

    PoductName() {
        cy.get(Locators.Search).clear()
        cy.get(Locators.Search).type(SearchConst.ValueProductName);
        cy.get(SearchLocators.AutocompleteSuggestion)
            .should('be.visible')

            .each(($el) => {
                cy.wrap($el)
                    .invoke('text')
                    .then((text) => {
                        expect(text.toLowerCase().trim()).to.include(SearchConst.ValueA.toLowerCase().trim());
                    });
            });
    }
    BrandName(){
        cy.get(Locators.Search).clear()
        cy.get(Locators.Search).type(SearchConst.ValueBand);
        cy.get(SearchLocators.AutocompleteSuggestion)
            .should('be.visible')
            .each(($el) => {
                cy.wrap($el)
                    .invoke('text')
                    .then((text) => {
                        expect(text.toLowerCase().trim()).to.include(SearchConst.ValueA.toLowerCase().trim());
                    });
            });

    }
}

export class SearchPage {
    Open() {cy.get(Locators.Search).type(SearchConst.ValueA);
        cy.get(SearchLocators.SearchButton).click()
        cy.get(Locators.Catalog).should('be.visible')



    }

}
