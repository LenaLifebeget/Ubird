import {GlobalStart} from "../../GlobalActions";
import {CheckHeader, CloseDropDown, CountIcons, HeaderClick, LogOut} from "./HeaderActions";
import {LocationAlert, LocationPage} from "../../Location/LocationAction";
import {SignIn} from "../../Sing in/SignInAction";


describe('Home page Header', () => {
    const globalStart = new GlobalStart();
    const checkHeader = new CheckHeader();
    const headerClick = new HeaderClick();
    const locationAlert = new LocationAlert();
    const locationPage = new LocationPage();
    const closeDropDown = new CloseDropDown();
    const signIn = new SignIn();
    const countIcons = new CountIcons();
    const logOut = new LogOut();

    beforeEach(() => {
        globalStart.visit();
        globalStart.closeCookie();
    })

    it('check headers and redirects', () => {

        checkHeader.Logo();
        checkHeader.Category();
        checkHeader.Search();
        checkHeader.SellOnUbird();
        checkHeader.Location();
        checkHeader.Currency();
        checkHeader.Language();
        checkHeader.Notification();
        checkHeader.Wishlist();
        checkHeader.ShoppingCard();
        checkHeader.AccountIcon();
        signIn.ValidCredentials()
        headerClick.WishlistWithSignIn()
        logOut.LogOutFunction()
});

    it('Check header clicks and redirects without sign in', () => {
        headerClick.Logo()
        headerClick.LogoRedirect()
        headerClick.Category();
        headerClick.Location();
        locationAlert.CloseAlert()
        locationPage.LocationMap()
        headerClick.Currency()
        headerClick.Languages()
        headerClick.Notification()
        headerClick.WishlistWithoutSignIn()
        headerClick.ShoppingCard()
        headerClick.AccountWithoutSignIn()
        headerClick.BecomeSeller()
    })

    it('Check drop down close functionally', () => {
        closeDropDown.Language()
        closeDropDown.Currency()
        signIn.ValidCredentials()
        closeDropDown.Account()
        closeDropDown.Notification()
    })

    it('Check Notification, Wishlist and shopping card counts', () => {
        countIcons.Notification()
        countIcons.ShoppingCart()
        countIcons.Wishlist()
        signIn.ValidCredentials()
        countIcons.Notification()
        countIcons.ShoppingCart()
        countIcons.Wishlist()
    });
})
