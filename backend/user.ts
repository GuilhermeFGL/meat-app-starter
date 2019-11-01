export class User {

	constructor(public email: string, 
		public name: string, 
		private password: string) { }

	matchers(user: User): boolean {
		return user != undefined 
			&& user.email === this.email 
			&& user.password === this.password;
	}
}

export const users: {[key: string]: User} ={
	"mail1@domain.com": new User('mail1@domain.com', 'User 1', 'password'),
	"mail2@domain.com": new User('mail2@domain.com', 'User 2', 'password')
}
