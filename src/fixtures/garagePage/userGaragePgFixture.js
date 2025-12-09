import { test as base } from '@playwright/test';
import GaragePg from '../../pageObjects/cars/garage/GaragePg';

export const test = base.extend({
    page: async({ browser }, use) => {
        const ctx = await browser.newContext({
            storageState: 'state/userStorageState.json',
        });
        const page = await ctx.newPage();
        await use(page);
        await ctx.close();
    },
    garagePg: async({ page }, use) => {
        const garagePg = new GaragePg(page);
        await garagePg.navigate();
        await use (garagePg);
    },
});
