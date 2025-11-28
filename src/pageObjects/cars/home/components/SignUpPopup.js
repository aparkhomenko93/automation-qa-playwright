import BaseComponent from '../../../BaseComponent';
import { expect } from '@playwright/test';


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

    }

    async fillForm(userData){
        await expect(this.container).toBeVisible();
        await this.nameFd.fill(userData.name);
        await this.lastNameFd.fill(userData.lastName);
        await this.emailFd.fill(userData.email);
        await this.passwordFd.fill(userData.password);
        await this.repeatPasswordFd.fill(userData.password);
    }

    async fillFormNegative(userData){
        await expect(this.container).toBeVisible();
        await this.nameFd.fill(userData.name);
        await this.lastNameFd.fill(userData.lastName);
        await this.emailFd.fill(userData.email);
        await this.passwordFd.fill(userData.password);
        await this.repeatPasswordFd.fill(userData.repeatPassword);
        await this.repeatPasswordFd.blur();
    }



    async fillAndSumbit(userData){
        await this.fillForm(userData);
        await this.submitBtn.click();
    }

    async fillAndSumbitNegative(userData){
        await this.fillFormNegative(userData);
        await expect(this.submitBtn).toBeDisabled();
    }
}
