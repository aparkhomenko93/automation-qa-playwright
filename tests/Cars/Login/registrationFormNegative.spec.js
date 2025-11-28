import { expect, test } from '@playwright/test';
import invalidFirstNames from '../../../src/fixtures/registrationPage/nameFieldNegative.json';
import invalidLastNames from '../../../src/fixtures/registrationPage/lastNameFieldNegative.json';
import invalidEmails from '../../../src/fixtures/registrationPage/emailFieldNegative.json';
import invalidPasswords from '../../../src/fixtures/registrationPage/passwordFieldNegative.json';
import { faker } from '@faker-js/faker';
import HomePg from '../../../src/pageObjects/cars/home/HomePg';
import GaragePg from '../../../src/pageObjects/cars/garage/GaragePg';
import SignUpPopup from '../../../src/pageObjects/cars/home/components/SignUpPopup';



test.describe('Check Registration Form Validation', () => {
    let homePg;
    let garagePg;
    let signUpPopup;

    test.beforeEach(async({ page }) => {
        homePg = new HomePg(page);
        garagePg = new GaragePg(page);
        signUpPopup = new SignUpPopup(page);

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
            await homePg.signUpNegative(userData);

            //Check field validation
            await expect(homePg.validationMsg).toHaveText(expected.message);
            await expect(signUpPopup.nameFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');

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
            await homePg.signUpNegative(userData);

            //Check field validation
            await expect(homePg.validationMsg).toHaveText(expected.message);
            await expect(signUpPopup.lastNameFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');

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
            await homePg.signUpNegative(userData);

            //Check field validation
            await expect(homePg.validationMsg).toHaveText(expected.message);
            await expect(signUpPopup.emailFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
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
            await homePg.signUpNegative(userData);

            //Check field validation
            await expect(homePg.validationMsg).toHaveText(expected.message);
            await expect(signUpPopup.passwordFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
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
        await homePg.signUpNegative(userData);

        //Check field validation
        await expect(homePg.validationMsg).toHaveText('Re-enter password required');
        await expect(signUpPopup.repeatPasswordFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
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
        await homePg.signUpNegative(userData);

        //Check field validation
        await expect(homePg.validationMsg).toHaveText('Passwords do not match');
        await expect(signUpPopup.repeatPasswordFd).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});
