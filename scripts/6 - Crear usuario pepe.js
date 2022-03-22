db.createUser({
	user : "pepe",
        pwd: "asd456",
	roles : [
		{ role : "read", db : "ecommerce" }
	]})