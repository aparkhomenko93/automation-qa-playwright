import { test } from '../../../src/fixtures/garagePage/userGaragePgFixture';
import ProfilePg from '../../../src/pageObjects/cars/garage/ProfilePg';

test.describe('Intercept Profile', () => {
    test('Intercept Profile test', async({ page })  => {
        const profilePg = new ProfilePg(page);

        const fakeUser = {
            firstName: 'Mr',
            lastName: 'Bean',
        };

        await page.route('**/api/users/profile', async route => {

            // GET API response
            const originalResponse = await route.fetch();
            const originalJson = await originalResponse.json();

            // Create modified response
            const modifiedJson = {
                ...originalJson,
                data: {
                    ...originalJson.data,
                    name: fakeUser.firstName,
                    lastName: fakeUser.lastName,
                },
            };

            // Return modified response
            await route.fulfill({
                status: originalResponse.status(),
                headers: originalResponse.headers(),
                contentType: 'application/json',
                body: JSON.stringify(modifiedJson),
            });
        });

        await profilePg.navigate();
        await page.pause();
        await profilePg.verifyProfileInfo(fakeUser);
    });
});
