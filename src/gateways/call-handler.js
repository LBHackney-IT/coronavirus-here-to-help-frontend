import axios from 'axios';
import {objectToQuery} from "../pages/api/utilityFuncs";

export class CallHandlerGateway {
    async getCallHandler() {
        const host = "http://localhost:3001";

        const url = `${host}/call_handlers`;
        const res = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.data;
    }
}