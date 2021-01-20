import axios from 'axios';
import {objectToQuery} from "../pages/api/utilityFuncs";

export class CallbackGateway {
    async getCallback(queryParams) {
        const host = "http://localhost:3001";

        const url = `${host}/callback_list${objectToQuery(queryParams)}`;
        const res = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.data;
    }
}