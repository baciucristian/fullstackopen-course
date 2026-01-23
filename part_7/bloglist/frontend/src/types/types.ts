export interface BlogEntry {
	id: string;
	title: string;
	author: string;
	user: string;
	url: string;
	likes: number;
}

export interface BlogFullEntry {
	id: string;
	title: string;
	author: string;
	url: string;
	likes: number;
	user: {
		id: string;
		name: string;
		username: string;
	};
}

export interface UserLogged {
	name: string;
	username: string;
	token: string;
}
