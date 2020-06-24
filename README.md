# 4Holder Ui

This is the 4Holder Ui repository. That deals all the static content of the web application.

### Running locally

Run the dependencies. At the FIRST TIME it will take a couple of minutes to download dependencies and compile the code. Once the containers are created it should spin up quickly.
```shell script
 docker-compose up
```

- public service will be running at port 3000. Take a look on its documentation because a `.env` is necessary in `public-service` dir.
- cash flow service will run at 9000.

Take a look on the docker-compose file for more information.

Now, you just need to run the application with:
```shell script
 npm start
```

### Running tests

```shell script
 npm test
```
