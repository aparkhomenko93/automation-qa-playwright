import BaseComponent from '../../../BaseComponent';


export default class SignUpPopup extends BaseComponent {
    constructor(page) {
        super(page);

        this.container = page.locator('.modal-content');
        this.nameFd = this.container.locator('#signupName');
        this.lastNameFd = this.container.locator('#signupLastName');
        this.emailFd = this.container.locator('#signupEmail');
        this.passwordFd = this.container.locator('#signupPassword');
        this.repeatPasswordFd = this.container.locator('#signupRepeatPassword');
        this.submitBtn = this.container.locator('.btn-primary');
        this.validationMsg = page.locator('div.invalid-feedback p').first();
    }

    async fillForm(userData){
        await this.nameFd.fill(userData.name);
        await this.lastNameFd.fill(userData.lastName);
        await this.emailFd.fill(userData.email);
        await this.passwordFd.fill(userData.password);
        await this.repeatPasswordFd.fill(userData.repeatPassword !== undefined
            ? userData.repeatPassword
            : userData.password);
        await this.repeatPasswordFd.blur();
    }

    async submitForm(){
        await this.submitBtn.click();
    }
}
