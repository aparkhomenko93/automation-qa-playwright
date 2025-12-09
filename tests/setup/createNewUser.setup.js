import { expect, test as setup } from '@playwright/test';
import { faker } from '@faker-js/faker';
import HomePg from '../../src/pageObjects/cars/home/HomePg';


setup('Create new user', async({ page, context }) =>{
    const homePg = new HomePg(page);
    await homePg.navigate();

    //Creation of test data
    const password = `Password${faker.number.int({ min: 10, max: 999 })}`;
    const userData = {
        'name': faker.person.firstName(),
        'lastName': faker.person.lastName(),
        'email': faker.internet.email(),
        'password': password,
    };

    //Complete registration process
    await homePg.fillFormAndSubmit(userData);
    await expect(page.getByText(' Log out ')).toBeVisible();
    //Save storage state
    await context.storageState({
        path: 'state/userStorageState.json',
    });
});
