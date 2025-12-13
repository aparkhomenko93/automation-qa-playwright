export default class CarsController {
    constructor(apiContext) {
        this.api = apiContext;
    }

    async getBrands() {
        const response = await this.api.get('/api/cars/brands');
        return this._response(response);
    }

    async getModels() {
        const response = await this.api.get('/api/cars/models');
        return this._response(response);
    }

    async createCar(body) {
        const response = await this.api.post('/api/cars', { data: body });
        return this._response(response);
    }

    async getCarById(id) {
        const response = await this.api.get(`/api/cars/${id}`);
        return this._response(response);
    }

    async _response(response) {
        return {
            status: response.status(),
            data: await response.json(),
        };
    }
}
