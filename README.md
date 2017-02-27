# API-BASIC

## API BASIC
demo app with REST REST API.

### REST API

List of basic routes:

Route	| HTTP	| Description
--------	| -------	| ---------------
/api/hello?name='{name}' | GET | Print hello, '{name}' !

List of user routes:

Route	| HTTP	| Description
--------	| -------	| ---------------
/api/users | GET | Get all the users
/api/users/:id | GET | Get a single user
/api/users/:id | POST | Create a user
/api/users/:id | DELETE | Delete a user
/api/users/:id | PUT | Update a user with new info
/api/users/:id | Patch | Update a user with specific new info

List of filter routes:

Route	| HTTP	| Description
--------	| -------	| ---------------
/api/users?name="{name}" | GET | Get '{name}' match in users
/api/users?name="{na}" | GET | Get '{na}' like in users

### Usage
With only npm:
	npm install
	npm start
	npm run dev

Access te website via [http:localhost:3000](http:localhost:3000) or API via [http://localhost:3000/api](http://localhost:3000/api)
