# Creating a restaurant MERN crud app
1. create create a folder where you want to install you applicatoon eg. `mern-crud`
2. cd into your folder with `cd mern-crud`
3. run command `npx create-react-app client` to create a react client application in the folder.
4.  Next run command `npm init -y` to install npm dependencies with default packages
5.  run `npm i express cors mongoose`
6.  create `app.js` file for all your application endpoints in the root folder.
7.  create `server.js` file in the root folder
8.  create mongodb database with collection and copy the connection String which is going to be used in the `app.js` file for mongodb connection sample connection string `mongodb://localhost:27017/name_of_your_database` for a local connection and `mongodb+srv://<user>:<password>@cluster0-un6sk.mongodb.net/test? 
    retryWrites=true` and replace username and password with your details for mongodb atlas connection.
9.  setup the `server.js` file and run `node server.js` in terminal to start the server.
10. open localhost and type url eg`localhost:port` where port is the port specified int the `server.js` file eg `3001`
11. cd into `cd client` when and run `npm i axios react-router-dom react-bootstrap bootstrap`
12. `cd client/src/index.js` and add `import 'bootstrap/dist/css/bootstrap.min.css';`
13. `cd client` and run `npm start` to start react application
14. To view all restaurants click on `All Restaurants` button on the home page.
15. To create an we restaurant click on `New Restaurant` button on the home page.

## Other instructions
1. Use `mongodb://127.0.0.1:27017` insted of `mongodb://localhost:27017` for the database connection

2. for image upload checkout this link [image upload](https://mathursanb.medium.com/how-to-upload-images-using-multer-in-the-mern-stack-206428aad007) using multer.

## Dependencies
1. react bootstrap : [installation](https://react-bootstrap.github.io/docs/getting-started/introduction)
2. multer: This is used for image upload on local storage : [installation](https://www.npmjs.com/package/multer)


