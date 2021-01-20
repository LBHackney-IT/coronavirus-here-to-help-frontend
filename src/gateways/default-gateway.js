import axios from "axios";

export class DefaultGateway {
    async getFromUrl(url) {
        const host = "http://localhost:3001";

        url = `${host}/${url}`;

        console.log(url);

        const res = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.data;
    }
}