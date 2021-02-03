import axios from 'axios';
export class DefaultGateway {

    createFullUrl(url) {
        return `/api/proxy/${url}`;
    }

    async getFromUrl(url) {
        console.log("getFromUrl")
        url = this.createFullUrl(url);

        console.log(url);

        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }

    async putToUrl(url, body) {
        const res = await axios.put(this.createFullUrl(url), body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }

    async postToUrl(url, body) {
      const res = await axios.post(this.createFullUrl(url), body, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return res.data;
    }

    async patchToUrl(url, body) {
      const res = await axios.patch(this.createFullUrl(url), body, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return res;
  }
}
