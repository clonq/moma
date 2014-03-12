moma
===

What
---

Model mapper for node.js

Why
---
We need an easy way to map a set of fields from one model to another. It could be the data model we fetched from the database that we want exposed to the web layer in a limited fashion. Or it could be the form data submitted from a web page that we want to massage in a model suitable for the database. Or it can be any other model you can think of.

Quick Example
---
Suppose your registration page posts data in the following format:
```
{
    	"usr": "joe",
        "email": "joe@somecompany.com"
    	"creditcard": "1234 5678 9012 3456"
}
```
And you plan to store the username and the email in your database but your DAO layer expects something like:
```
{
    Username: ...
    Email: ...
}
```
Obviously you need to map one model to another. There are multiple ways to accomplish this but this is moma's way:
```
var dbModel = moma.map(viewModel)
```
For this to work though you need a mapping file like this:
```
{
    "global": {
		"mappings": {
			"usr": "Username",
            "email": "Email
		}
	}
}
```
Or even better, if you use moma as a middleware, just
```
var moma = require('../moma').middleware();
...
app.use(moma);
...
```
And your `req.body` will contain the maped values as per your mappings file.

