export class User {
  constructor(
    public email: string,
    public id: number,
    private _token: string,
    private _expireDate: Date) {
  }
  get token() {
    if(!this._expireDate || this._expireDate< new Date()) {
      return null;
    }
    return this._token;
  }


}
