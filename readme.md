# This is a express, mongoose, typescript http server application

[live server Link](https://typescript-express-mongoose.vercel.app)

## to run the server locally

- clone the repository
- open terminal and write

```npm
npm install
```

```npm
npm run start-dev
```

## create a uses with the json data

```json
{
    "userId":1,
    "username": "asif.32fe5",
    "password": "p3a1sesggword123",
    "fullName": {
        "firstName": "Aohn",
        "lastName": "Doe"
    },
    "email": "j3e@example.com",
    "age": 25,
    "hobbies": [
        "Reading",
        "Gardening"
    ],
    "address": {
        "street": "123 Main St",
        "city": "Cityville",
        "country": "Countryland"
    },
    "isActive": true
}
```

### endpoint of the application 
* http://localhost:5001/api/users/     // create user 
* http://localhost:5001/api/users/     // get all user
* http://localhost:5001/api/users/1     // get single user
* http://localhost:5001/api/users/1     // update user
* http://localhost:5001/api/users/1     // delete user
* http://localhost:5001/api/users/1/orders     // update user oders with the data
  ```json
  {
    "productName": "bb7",
    "price": 99,
    "quantity":3
}
```

* http://localhost:5001/api/users/1/orders/total-price     // calculate users orders 

