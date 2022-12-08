import fetcher from "axios";

class BaseFetcher {
  constructor(fetcher, options = {}) {
    if (!fetcher) {
      throw new Error("Please add fetcher!");
    }
    this.fetcher = fetcher.create(options);
  }

  post(...options) {
    return this.fetcher.post(...options).then((res) => res.data);
  }

  get(...options) {
    return this.fetcher.get(...options).then((res) => res.data);
  }

  put(...options) {
    return this.fetcher.put(...options).then((res) => res.data);
  }

  delete(...options) {
    return this.fetcher.delete(...options).then((res) => res.data);
  }

  setOptions(options) {
    this.fetcher.defaults.headers.common = {
      ...this.fetcher.defaults.headers.common,
      ...options,
    };
  }
}

export const baseFetcher = new BaseFetcher(fetcher, {
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
