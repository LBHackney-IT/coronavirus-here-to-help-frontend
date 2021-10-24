import { DefaultGateway } from '../gateways/default-gateway';

const ToDomain = (ch) => {
    return {
        id: ch.Id,
        name: ch.Name,
        email: ch.Email
    };
};

const ToCallHandlerObject = (response) => {
    let object = {
        Id: response.id,
        Name: response.name,
        Email: response.email
    };

    Object.keys(object).forEach((key) => object[key] == null && delete object[key]);

    return JSON.stringify(object);
};

export class CallHandlerGateway extends DefaultGateway {
    async getCallHandler(callHandlerId) {
        const response = await this.getFromUrl(`v4/call-handlers/${callHandlerId}`);
        return ToDomain(response);
    }

    async getCallHandlers() {
        const response = await this.getFromUrl(`v4/call-handlers`);
        return response.map(ToDomain);
    }

    async postCallHandler(requestBody) {
        console.log('request formatted', ToCallHandlerObject(requestBody));
        return await this.postToUrl(`v4/call-handlers/`, ToCallHandlerObject(requestBody));
    }

    async updateCallHandler(requestBody) {
        let updatedCallHandler = ToCallHandlerObject(requestBody);
        return await this.putToUrl(`v4/call-handlers/`, updatedCallHandler);
    }

    async deleteCallHandler(id) {
        return await this.deleteToUrl(`v4/call-handlers/${id}`);
    }
}
