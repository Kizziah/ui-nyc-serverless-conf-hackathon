export class User {
	id: number;
  username: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdministrator: boolean;
  token: string;

  set setUserId(id: number) {
    this.id = id;
  }

  get getUserId(): number {
    return this.id;
  }
}
