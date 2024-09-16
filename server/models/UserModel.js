class User {
  constructor(id, name, socketId) {
    Object.defineProperty(this, "_userData", {
      value: {
        id: id || null,
        name: name || "",
        socketId: socketId || "",
      },
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  get userDetails() {
    return { ...this._userData };
  }

  get socketId() {
    return this._userData.socketId;
  }
}

export default User;
