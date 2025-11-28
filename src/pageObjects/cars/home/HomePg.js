import BasePg from '../../BasePg';
import SignUpPopup from './components/SignUpPopup';


export default class HomePg extends BasePg {
    constructor(page) {
        super(page, '/');
        this.signUpBtn = page.getByRole('button', { name: 'Sign up' });
        this.validationMsg = page.locator('div.invalid-feedback p').first();
    }

    async openSignUpPopup() {
        await this.signUpBtn.click();
        return new SignUpPopup(this.page);
    }

    async signUp(userData){
        const popup = await this.openSignUpPopup();
        await popup.fillAndSumbit(userData);
    }

    async signUpNegative(userData){
        const popup = await this.openSignUpPopup();
        await popup.fillAndSumbitNegative(userData);
    }
}
