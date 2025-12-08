import { test } from '../../../src/fixtures/garagePage/userGaragePgFixture';

test.describe.only('Empty garage (using fixture)', () => {
    test('Check empty garage after registration (using fixture)', async({ garagePg })  => {
        //Check user is logged in after registration and there are no cars
        await garagePg.checkNoCarMessage();
    });
});
