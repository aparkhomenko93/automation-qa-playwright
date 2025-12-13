import { test } from '../../../src/fixtures/garagePage/userGaragePgFixture';
import { expect, request } from '@playwright/test';
import { faker } from '@faker-js/faker';
import CarsController from '../../../src/api/CarsController';
import { getRandomItem } from '../../../src/helpers/random';

test.describe('Create car negative cases', () => {
    // Creation of API context
    let apiContext;
    let carsApi;

    test.beforeEach(async({ page }) => {
        apiContext = await request.newContext({
            storageState: await page.context().storageState(),
        });
        carsApi = new CarsController(apiContext);
    });

    test('Check invalid brand validation', async() => {

        // Create new car with incorrect data
        const body = {
            carBrandId: -1,
            carModelId: 15,
            mileage: faker.number.int({ min: 0, max: 999999 }),
        };

        const createRes = await carsApi.createCar(body);
        expect(createRes.status).toBe(404);
        expect(createRes.data).toEqual({
            status: 'error',
            message: 'Brand not found',
        });
    });

    test('Check invalid model validation', async() => {

        // Get brands
        const brandsRes = await carsApi.getBrands();
        expect(brandsRes.status).toBe(200);
        const carBrand = getRandomItem(brandsRes.data.data);

        // Create new car with incorrect data
        const body = {
            carBrandId: carBrand.id,
            carModelId: -1,
            mileage: faker.number.int({ min: 0, max: 999999 }),
        };

        const createRes = await carsApi.createCar(body);
        expect(createRes.status).toBe(404);
        expect(createRes.data).toEqual({
            status: 'error',
            message: 'Model not found',
        });
    });

    test('Check car creation without brand', async() => {

        // Create new car with incorrect data
        const body = {
            carModelId: 15,
            mileage: faker.number.int({ min: 0, max: 999999 }),
        };

        const createRes = await carsApi.createCar(body);
        expect(createRes.status).toBe(400);
        expect(createRes.data).toEqual({
            status: 'error',
            message: 'Car brand id is required',
        });
    });

    test('Check car creation without model', async() => {

        // Get brands
        const brandsRes = await carsApi.getBrands();
        expect(brandsRes.status).toBe(200);
        const carBrand = getRandomItem(brandsRes.data.data);

        // Create new car with incorrect data
        const body = {
            carBrandId: carBrand.id,
            mileage: faker.number.int({ min: 0, max: 999999 }),
        };

        const createRes = await carsApi.createCar(body);
        expect(createRes.status).toBe(400);
        expect(createRes.data).toEqual({
            status: 'error',
            message: 'Car model id is required',
        });
    });

    test('Check car creation without mileage', async() => {

        // Get brands
        const brandsRes = await carsApi.getBrands();
        expect(brandsRes.status).toBe(200);
        const carBrand = getRandomItem(brandsRes.data.data);

        // Get models
        const modelsRes = await carsApi.getModels();
        expect(modelsRes.status).toBe(200);
        const carModel = getRandomItem(
            modelsRes.data.data.filter(m => m.carBrandId === carBrand.id),
        );

        // Create new car with incorrect data
        const body = {
            carBrandId: carBrand.id,
            carModelId: carModel.id,
        };

        const createRes = await carsApi.createCar(body);
        expect(createRes.status).toBe(400);
        expect(createRes.data).toEqual({
            status: 'error',
            message: 'Mileage is required',
        });
    });

    test('Check car creation with negative mileage', async() => {

        // Get brands
        const brandsRes = await carsApi.getBrands();
        expect(brandsRes.status).toBe(200);
        const carBrand = getRandomItem(brandsRes.data.data);

        // Get models
        const modelsRes = await carsApi.getModels();
        expect(modelsRes.status).toBe(200);
        const carModel = getRandomItem(
            modelsRes.data.data.filter(m => m.carBrandId === carBrand.id),
        );

        // Create new car with incorrect data
        const body = {
            carBrandId: carBrand.id,
            carModelId: carModel.id,
            mileage: -1,
        };

        const createRes = await carsApi.createCar(body);
        expect(createRes.status).toBe(400);
        expect(createRes.data).toEqual({
            status: 'error',
            message: 'Mileage has to be from 0 to 999999',
        });
    });

    test.afterEach(async() => {
        // Close API context
        await apiContext.dispose();
    });
});
