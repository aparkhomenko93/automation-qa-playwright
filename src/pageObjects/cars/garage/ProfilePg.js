import { expect } from '@playwright/test';
import BasePg from '../../BasePg';

export default class ProfilePg extends BasePg {
    constructor(page) {
        super(page, '/panel/profile');
    }

    async verifyProfileInfo(userInfo) {
        await expect(this.page.locator('app-profile p'), 'Check user\'s first name and last name')
            .toHaveText(`${userInfo.firstName} ${userInfo.lastName}`);
    }
}
