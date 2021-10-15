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
        Id: response.Id,
        Name: `${response.firstName} ${response.lastName}`,
        Email: response.emailAddress
    };

    Object.keys(object).forEach((key) => object[key] == null && delete object[key]);

    return JSON.stringify(object);
};

export class CallHandlerGateway extends DefaultGateway {
    async getCallHandler(callHandlerId) {
        return { id: 1, name: 'Person Middle Name A', email: 'test@test.com' };

        //REAL one
        // const response = await this.getFromUrl(`v4/call-handlers/${callHandlerId}`);
        // return response.map(ToDomain);
    }

    async getCallHandlers() {
        const response = await this.getFromUrl(`v4/call-handlers`);
        return response.map(ToDomain);
    }

    async postCallHandler(requestBody) {
        console.log('request formatted', ToCallHandlerObject(requestBody));
        return await this.postToUrl(`v4/call-handlers/`, ToCallHandlerObject(requestBody));
    }

    async updateCallHandler(callHandlerId, requestBody) {
        console.log('request body', requestBody);
        console.log('request body format', ToCallHandlerObject(requestBody));
        return await this.patchToUrl(
            `v4/call-handlers/${callHandlerId}`,
            ToCallHandlerObject(requestBody)
        );
    }
}
