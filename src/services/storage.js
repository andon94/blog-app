class Storage {
  constructor({ prefix = "blog_app_", storage = window.localStorage } = {}) {
    this.prefix = prefix;
    this.storage = storage;
  }

  getItem(key) {
    try {
      const data = this.storage.getItem(`${this.prefix}${key}`);
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  setItem(key, value) {
    this.storage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
  }

  removeItem(key) {
    this.storage.removeItem(`${this.prefix}${key}`);
  }
}

export default new Storage();
