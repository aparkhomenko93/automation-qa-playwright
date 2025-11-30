import BasePg from '../../BasePg';
import SignUpPopup from './components/SignUpPopup';


export default class HomePg extends BasePg {
    constructor(page) {
        super(page, '/');
        this.signUpBtn = page.getByRole('button', { name: 'Sign up' });
    }

    async openSignUpPopup() {
        await this.signUpBtn.click();
        return new SignUpPopup(this.page);
    }

    async fillForm(userData){
        const popup = await this.openSignUpPopup();
        await popup.fillForm(userData);
        return popup;
    }

    async fillFormAndSubmit(userData){
        const popup = await this.fillForm(userData);
        await popup.submitForm();
    }
}
