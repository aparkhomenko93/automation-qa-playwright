import { expect, test } from '@playwright/test';
import invalidFirstNames from '../../../src/fixtures/registrationPage/nameFieldNegative.json';
import invalidLastNames from '../../../src/fixtures/registrationPage/lastNameFieldNegative.json';
import invalidEmails from '../../../src/fixtures/registrationPage/emailFieldNegative.json';
import invalidPasswords from '../../../src/fixtures/registrationPage/passwordFieldNegative.json';
import { faker } from '@faker-js/faker';
import HomePg from '../../../src/pageObjects/cars/home/HomePg';
import GaragePg from '../../../src/pageObjects/cars/garage/GaragePg';



test.describe('Check Registration Form Validation', () => {
    let homePg;

    test.beforeEach(async({ page }) => {
        homePg = new HomePg(page);

        await homePg.navigate();
    });

    //First name negative cases check
    for (const { input, expected, title } of invalidFirstNames) {
        test(title, async({ page })  => {

            //Test user
            const password = 'Qwerty123';
            const userData = {
                'name': input.firstName,
                'lastName': 'White',
                'email': faker.internet.email(),
                'password': password,
                'repeatPassword': password,
            };

            //Fill signup form with incorrect data
            const popup = await homePg.fillForm(userData);

            //Check field validation
            await expect(popup.validationMsg).toHaveText(expected.message);
            await expect(popup.nameFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.submitBtn).toBeDisabled();
        });
    }

    //Last name negative cases check
    for (const { input, expected, title } of invalidLastNames) {
        test(title, async({ page })  => {
            //Test user
            const password = 'Qwerty123';
            const userData = {
                'name': 'Walter',
                'lastName': input.lastName,
                'email': faker.internet.email(),
                'password': password,
                'repeatPassword': password,
            };

            //Fill signup form with incorrect data
            const popup = await homePg.fillForm(userData);

            //Check field validation
            await expect(popup.validationMsg).toHaveText(expected.message);
            await expect(popup.lastNameFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.submitBtn).toBeDisabled();
        });
    }

    //Email negative cases check
    for (const { input, expected, title } of invalidEmails) {
        test(title, async({ page })  => {
            //Test user
            const password = 'Qwerty123';
            const userData = {
                'name': 'Walter',
                'lastName': 'White',
                'email': input.email,
                'password': password,
                'repeatPassword': password,
            };

            //Fill signup form with incorrect data
            const popup = await homePg.fillForm(userData);

            //Check field validation
            await expect(popup.validationMsg).toHaveText(expected.message);
            await expect(popup.emailFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.submitBtn).toBeDisabled();
        });
    }

    //Password negative cases check
    for (const { input, expected, title } of invalidPasswords) {
        test(title, async({ page })  => {
            //Test user
            const password = input.password;
            const userData = {
                'name': 'Walter',
                'lastName': 'White',
                'email': faker.internet.email(),
                'password': password,
                'repeatPassword': password,
            };

            //Fill signup form with incorrect data
            const popup = await homePg.fillForm(userData);

            //Check field validation
            await expect(popup.validationMsg).toHaveText(expected.message);
            await expect(popup.passwordFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.submitBtn).toBeDisabled();
        });
    }

    test('Invalid Repeat Password - Empty', async({ page })  => {
        //Test user
        const userData = {
            'name': 'Walter',
            'lastName': 'White',
            'email': faker.internet.email(),
            'password': 'Qwerty123',
            'repeatPassword': '',
        };

        //Fill signup form with incorrect data
        const popup = await homePg.fillForm(userData);

        //Check field validation
        await expect(popup.validationMsg).toHaveText('Re-enter password required');
        await expect(popup.repeatPasswordFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(popup.submitBtn).toBeDisabled();
    });

    test('Invalid Repeat Password - Incorrect repeated password', async({ page })  => {
        //Test user
        const userData = {
            'name': 'Walter',
            'lastName': 'White',
            'email': faker.internet.email(),
            'password': 'Qwerty123',
            'repeatPassword': 'Qwerty1234',
        };

        //Fill signup form with incorrect data
        const popup = await homePg.fillForm(userData);

        //Check field validation
        await expect(popup.validationMsg).toHaveText('Passwords do not match');
        await expect(popup.repeatPasswordFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(popup.submitBtn).toBeDisabled();
    });
});
