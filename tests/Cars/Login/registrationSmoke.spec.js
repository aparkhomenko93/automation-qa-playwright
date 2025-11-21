import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Registration Smoke', () => {

    test.beforeEach(async({ page }) => {
        await page.goto('/');
    });

    //Test Login Smoke
    test('Registration Smoke Test', async({ page })  => {

        //Creation of test data
        const password = `Password${faker.number.int({ min: 10, max: 999 })}`;
        const userData = {
            'name': faker.person.firstName(),
            'lastName': faker.person.lastName(),
            'email': faker.internet.email(),
            'password': password,
        };

        //Start registration process
        const signupButton = page.getByRole('button', { name: 'Sign up' });
        await signupButton.click();

        const signupPopup =  page.locator('.modal-content');
        await signupPopup.locator('#signupName').fill(userData.name);
        await signupPopup.locator('#signupLastName').fill(userData.lastName);
        await signupPopup.locator('#signupEmail').fill(userData.email);
        await signupPopup.locator('#signupPassword').fill(userData.password);
        await signupPopup.locator('#signupRepeatPassword').fill(userData.password);
        await signupPopup.locator('.btn-primary').click();

        //Check user is logged in after registration
        await expect(page.locator('app-garage p', { hasText: 'You don’t have any cars in your garage' }))
            .toBeVisible();
    });
});
