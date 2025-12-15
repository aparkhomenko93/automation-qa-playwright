import { test } from '../../../src/fixtures/garagePage/userGaragePgFixture';
import { expect, request } from '@playwright/test';
import { faker } from '@faker-js/faker';
import CarsController from '../../../src/api/CarsController';
import { getRandomItem } from '../../../src/helpers/random';

test.describe('Create car via API smoke', () => {
    // Creation of API context
    let apiContext;
    let carsApi;

    test.beforeEach(async({ page }) => {
        apiContext = await request.newContext({
            storageState: await page.context().storageState(),
        });
        carsApi = new CarsController(apiContext);
    });

    test('Create car test via API', async({ page }) => {

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

        // Create new car
        const body = {
            carBrandId: carBrand.id,
            carModelId: carModel.id,
            mileage: faker.number.int({ min: 0, max: 999999 }),
        };

        const createRes = await carsApi.createCar(body);
        expect(createRes.status).toBe(201);

        const createdCar = createRes.data.data;

        // Check created car data
        const expectedCarData = {
            id: expect.any(Number),
            carBrandId: body.carBrandId,
            carModelId: body.carModelId,
            initialMileage: body.mileage,
            updatedMileageAt: expect.any(String),
            carCreatedAt: expect.any(String),
            mileage: body.mileage,
            brand: carBrand.title,
            model: carModel.title,
            logo: carBrand.logoFilename,
        };
        expect(createdCar).toEqual(expectedCarData);

        // Get car by ID and check data
        const getCarRes = await carsApi.getCarById(createdCar.id);
        expect(getCarRes.status).toBe(200);
        expect(getCarRes.data.data).toEqual(expectedCarData);
    });

    test.afterEach(async() => {
        // Close API context
        await apiContext.dispose();
    });
});
