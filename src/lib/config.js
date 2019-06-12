const TOKEN_FIELD = "token";
const URI_FIELD = "uri";
const SELECTED_ACCOUNT_NUMBER = "selected_account_number";

class Config {
  constructor() {
    if (localStorage) {
      this.storage = localStorage;
    }
  }

  hasRequiredSettings() {
    const s = this.storage;
    return s.getItem(URI_FIELD) && s.getItem(TOKEN_FIELD);
  }

  hasSelectedAccountNumber() {
    const s = this.storage;
    return s.getItem(SELECTED_ACCOUNT_NUMBER);
  }

  setUri(uri) {
    const s = this.storage;
    s.setItem(URI_FIELD, uri);
  }

  getUri() {
    const s = this.storage;
    return s.getItem(URI_FIELD);
  }

  setToken(token) {
    const s = this.storage;
    s.setItem(TOKEN_FIELD, token);
  }

  getToken() {
    const s = this.storage;
    return s.getItem(TOKEN_FIELD);
  }

  setSelectedAccountNumber(selectedAccountNumber) {
    const s = this.storage;
    s.setItem(SELECTED_ACCOUNT_NUMBER, selectedAccountNumber);
  }

  getSelectedAccountNumber() {
    const s = this.storage;
    return s.getItem(SELECTED_ACCOUNT_NUMBER);
  }
}

exports.default = new Config();
