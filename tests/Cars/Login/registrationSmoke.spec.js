import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import HomePg from '../../../src/pageObjects/cars/home/HomePg';
import GaragePg from '../../../src/pageObjects/cars/garage/GaragePg';

test.describe('Registration Smoke', () => {
    let homePg;
    let garagePg;

    test.beforeEach(async({ page }) => {
        homePg = new HomePg(page);
        garagePg = new GaragePg(page);

        await homePg.navigate();
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

        //Complete registration process
        await test.step('Registration of new user', async() => {
            await homePg.fillFormAndSubmit(userData);
        });

        //Check user is logged in after registration
        await test.step('User should be logged in and see Garage page', async() => {
            await garagePg.checkNoCarMessage();
        });
    });
});
