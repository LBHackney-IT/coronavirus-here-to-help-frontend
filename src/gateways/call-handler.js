import { DefaultGateway } from '../gateways/default-gateway';

const ToDomain = (ch) => {
    return {
        id: ch.Id,
        name: ch.Name,
        email: ch.Email
    };
};

export class CallHandlerGateway extends DefaultGateway {
    async getCallHandler(callHandlerId) {
        return { id: 1, firstName: 'Person', lastName: 'A', email: 'test@test.com' };

        //REAL one
        // const response = await this.getFromUrl(`v4/call-handlers/${callHandlerId}`);
        // return response.map(ToDomain);
    }

    async getCallHandlers() {
        // if (process.env.NEXT_PUBLIC_APP_STAGE == 'dev')
        return [
            { id: 1, firstName: 'Person', lastName: 'A', email: 'test@test.com' },
            { id: 2, firstName: 'Person', lastName: 'B' },
            { id: 3, firstName: 'Person', lastName: 'C' },
            { id: 4, firstName: 'Person', lastName: 'D' }
        ];
        // return process.env.NEXT_PUBLIC_CALL_HANDLERS
        //     ? process.env.NEXT_PUBLIC_CALL_HANDLERS.split(',')
        //     : [];
        // const response = await this.getFromUrl(`v4/call-handlers`);
        // return response.map(ToDomain);

        //REAL One
        // const response = await this.getFromUrl(`v4/call-handlers`);
        // return response.map(ToDomain);
    }
}
