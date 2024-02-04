# Project 2: 

This is a course project for the course web software development. This readme cointains the necessary documentation to use and understand said project, how to use tests and so forth.

The webapp is a simple app for creating questions and answers, and allows the user to do the following:
* Add topics
* Add questions to said topics
* Add answer options to said questions
* Use a quiz mode to answer questions (answer options can be correct or incorrect)
* Utilize an API to use the quiz mode and other functionality via requests

## Requirements
- Docker: the user needs docker to launch the webapp.

## Using the webapp
To run the website using docker, simply do
```
docker compose up
```
If everything works correctly, flyway will take care of setting up the initial postgres db and tables. A test user admin@admin.com (password: 123456) is also created automatically.

## Testing
Automated tests can be found in e2e-playwright/tests. There are currently ten tests, that tall test different parts of the functionality.


To run the tests (using a docker deployment), do:
```
docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf
```
Observe! To get the tests to work smoothly, I found it easiest to first do docker compose down and docker compose up, to make sure that a) the database is empty and b) the service is up and running when the tests start, making sure there are no errors caused by this.

## Online deployment
This web service is deployed online at ADD LINK HERE . The service name is wsd-project1, and it is deployed using render. It utilizes a connection pool to a render-hosted postgres database, and environment variables to keep db credentials safe.

Notice that the free tier subscription on render causes the service to sometimes respond quite slowly. 



