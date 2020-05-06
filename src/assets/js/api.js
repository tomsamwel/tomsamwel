class Api {
    constructor() {
        this.patchOptions = {};
        this.patchOptions.method = "PATCH";
        this.patchOptions.headers = new Headers();
        this.patchOptions.headers.append(
            "content-type",
            "application/x-www-form-urlencoded"
        );
        this.patchOptions.body;
    }

    toUrlEncoded(obj) {
        return Object.keys(obj)
            .map(
                (k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k])
            )
            .join("&");
    }

    /**
     * Send a get request to given url
     * @param {String} url the url for fetch to use
     *
     * @return {Promise} the promise will return the response as JSON.
     */
    get(url) {
        // console.log("api fetching " + url);
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                if (response.ok) {
                    response
                        .json()
                        .then((json) => {
                            resolve(json);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else reject(0);
            });
        });
    }

    /**
     * Send a patch request to given url with given body using the instance's patch settings
     * @param {String} url the url for fetch to use
     * @param {Object=} body containing parameters to send with the request as the body
     *
     * @return {Promise} the promise will return the response as JSON.
     */
    patch(url, body) {
        // console.log("api patching to " + url);

        this.patchOptions.body = this.toUrlEncoded(body);

        return new Promise((resolve, reject) => {
            fetch(url, this.patchOptions).then((response) => {
                if (response.ok) {
                    response
                        .json()
                        .then((json) => {
                            resolve(json);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else reject(0);
            });
        });
    }
}
export default new Api();
