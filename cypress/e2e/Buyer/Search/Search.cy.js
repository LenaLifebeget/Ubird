import {GlobalStart} from "../GlobalActions";
import {SearchInput, SearchPage} from "./SearchAction";



describe('check Search functionally', () => {
    const searchInput = new SearchInput();
    const globalStart = new GlobalStart();
    const searchPage = new SearchPage();


    beforeEach(() => {
        globalStart.visit();
        globalStart.closeCookie();
    })
    it('check Search input and autocomplete in Header', () => {
        // searchInput.ValidData()
        // searchInput.InvalidData()
        // searchInput.DeleteData()
        // searchInput.CheckImage()
        // searchInput.PartialSearch()
        searchInput.PartialSearch_MultiLang()
        searchInput.PoductName()
        searchInput.BrandName()
    });

    it('check search page', () => {
        searchPage.Open()

    })
})
