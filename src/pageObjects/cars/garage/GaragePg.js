import { expect } from '@playwright/test';
import BasePg from '../../BasePg';


export default class GaragePg extends BasePg {
    constructor(page) {
        super(page, '/panel/garage');

        this.defaultMessage = this.page.locator('app-garage p');
    }

    async checkNoCarMessage() {
        await expect(this.defaultMessage, 'Check user is logged in and can see the default message.')
            .toHaveText('You don’t have any cars in your garage');
    }
}
