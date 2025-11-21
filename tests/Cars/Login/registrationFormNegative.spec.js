import { expect, test } from '@playwright/test';
import invalidFirstNames from '../../../fixtures/registrationPage/nameFieldNegative.json';
import invalidLastNames from '../../../fixtures/registrationPage/lastNameFieldNegative.json';
import invalidEmails from '../../../fixtures/registrationPage/emailFieldNegative.json';
import invalidPasswords from '../../../fixtures/registrationPage/passwordFieldNegative.json';
import { faker } from '@faker-js/faker';



test.describe.only('Check Registration Form Validation', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('/');
    });

    //First name negative cases check
    for (const { input, expected, title } of invalidFirstNames) {
        test(title, async({ page })  => {

            //Start registration process
            const signupButton = page.getByRole('button', { name: 'Sign up' });
            await signupButton.click();

            const signupPopup =  page.locator('.modal-content');
            const firstNameFd = await signupPopup.locator('#signupName');
            const lastNameFd = await signupPopup.locator('#signupLastName');
            const emailFd = await signupPopup.locator('#signupEmail');
            const passwordFd = await signupPopup.locator('#signupPassword');
            const repeatPasswordFd = await signupPopup.locator('#signupRepeatPassword');
            const submitButton = await signupPopup.locator('.btn-primary');



            //Fill first name with invalid data
            await firstNameFd.fill(input.firstName);
            await firstNameFd.blur();

            //Fill other required fields
            await lastNameFd.fill('White');
            await emailFd.fill(faker.internet.email());
            await passwordFd.fill('Qwerty123');
            await repeatPasswordFd.fill('Qwerty123');

            //Check field validation
            await expect(page.locator('div.invalid-feedback p')).toHaveText(expected.message);
            await expect(firstNameFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(submitButton).toBeDisabled();
        });
    }

    //Last name negative cases check
    for (const { input, expected, title } of invalidLastNames) {
        test(title, async({ page })  => {

            //Start registration process
            const signupButton = page.getByRole('button', { name: 'Sign up' });
            await signupButton.click();

            const signupPopup =  page.locator('.modal-content');
            const firstNameFd = await signupPopup.locator('#signupName');
            const lastNameFd = await signupPopup.locator('#signupLastName');
            const emailFd = await signupPopup.locator('#signupEmail');
            const passwordFd = await signupPopup.locator('#signupPassword');
            const repeatPasswordFd = await signupPopup.locator('#signupRepeatPassword');
            const submitButton = await signupPopup.locator('.btn-primary');



            //Fill last name with invalid data
            await lastNameFd.fill(input.lastName);
            await lastNameFd.blur();

            //Fill other required fields
            await firstNameFd.fill('Mr');
            await emailFd.fill(faker.internet.email());
            await passwordFd.fill('Qwerty123');
            await repeatPasswordFd.fill('Qwerty123');

            //Check field validation
            await expect(page.locator('div.invalid-feedback p')).toHaveText(expected.message);
            await expect(lastNameFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(submitButton).toBeDisabled();
        });
    }

    //Email negative cases check
    for (const { input, expected, title } of invalidEmails) {
        test(title, async({ page })  => {

            //Start registration process
            const signupButton = page.getByRole('button', { name: 'Sign up' });
            await signupButton.click();

            const signupPopup =  page.locator('.modal-content');
            const firstNameFd = await signupPopup.locator('#signupName');
            const lastNameFd = await signupPopup.locator('#signupLastName');
            const emailFd = await signupPopup.locator('#signupEmail');
            const passwordFd = await signupPopup.locator('#signupPassword');
            const repeatPasswordFd = await signupPopup.locator('#signupRepeatPassword');
            const submitButton = await signupPopup.locator('.btn-primary');



            //Fill email with invalid data
            await emailFd.fill(input.email);
            await emailFd.blur();

            //Fill other required fields
            await firstNameFd.fill('Walter');
            await lastNameFd.fill('White');
            await passwordFd.fill('Qwerty123');
            await repeatPasswordFd.fill('Qwerty123');

            //Check field validation
            await expect(page.locator('div.invalid-feedback p')).toHaveText(expected.message);
            await expect(emailFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(submitButton).toBeDisabled();
        });
    }

    //Password negative cases check
    for (const { input, expected, title } of invalidPasswords) {
        test(title, async({ page })  => {

            //Start registration process
            const signupButton = page.getByRole('button', { name: 'Sign up' });
            await signupButton.click();

            const signupPopup =  page.locator('.modal-content');
            const firstNameFd = await signupPopup.locator('#signupName');
            const lastNameFd = await signupPopup.locator('#signupLastName');
            const emailFd = await signupPopup.locator('#signupEmail');
            const passwordFd = await signupPopup.locator('#signupPassword');
            const repeatPasswordFd = await signupPopup.locator('#signupRepeatPassword');
            const submitButton = await signupPopup.locator('.btn-primary');



            //Fill password with invalid data
            await passwordFd.fill(input.password);
            await passwordFd.blur();

            //Fill other required fields
            await firstNameFd.fill('Walter');
            await lastNameFd.fill('White');
            await emailFd.fill(faker.internet.email());
            await repeatPasswordFd.fill('Qwerty123');

            //Check field validation
            await expect(page.locator('div.invalid-feedback p')).toHaveText(expected.message);
            await expect(passwordFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(submitButton).toBeDisabled();
        });
    }

    test('Invalid Repeat Password - Empty', async({ page })  => {

        //Start registration process
        const signupButton = page.getByRole('button', { name: 'Sign up' });
        await signupButton.click();

        const signupPopup =  page.locator('.modal-content');
        const firstNameFd = await signupPopup.locator('#signupName');
        const lastNameFd = await signupPopup.locator('#signupLastName');
        const emailFd = await signupPopup.locator('#signupEmail');
        const passwordFd = await signupPopup.locator('#signupPassword');
        const repeatPasswordFd = await signupPopup.locator('#signupRepeatPassword');
        const submitButton = await signupPopup.locator('.btn-primary');

        //Fill all the required fields except the repeat password
        await firstNameFd.fill('Walter');
        await lastNameFd.fill('White');
        await emailFd.fill(faker.internet.email());
        await passwordFd.fill('Qwerty123');
        await repeatPasswordFd.focus();
        await repeatPasswordFd.blur();

        //Check field validation
        await expect(page.locator('div.invalid-feedback p')).toHaveText('Re-enter password required');
        await expect(repeatPasswordFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(submitButton).toBeDisabled();
    });

    test('Invalid Repeat Password - Incorrect repeated password', async({ page })  => {

        //Start registration process
        const signupButton = page.getByRole('button', { name: 'Sign up' });
        await signupButton.click();

        const signupPopup =  page.locator('.modal-content');
        const firstNameFd = await signupPopup.locator('#signupName');
        const lastNameFd = await signupPopup.locator('#signupLastName');
        const emailFd = await signupPopup.locator('#signupEmail');
        const passwordFd = await signupPopup.locator('#signupPassword');
        const repeatPasswordFd = await signupPopup.locator('#signupRepeatPassword');
        const submitButton = await signupPopup.locator('.btn-primary');

        //Fill all the required fields except the repeat password
        await firstNameFd.fill('Walter');
        await lastNameFd.fill('White');
        await emailFd.fill(faker.internet.email());
        await passwordFd.fill('Qwerty123');
        await repeatPasswordFd.fill('Qwerty124');
        await repeatPasswordFd.blur();

        //Check field validation
        await expect(page.locator('div.invalid-feedback p')).toHaveText('Passwords do not match');
        await expect(repeatPasswordFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(submitButton).toBeDisabled();
    });
});
