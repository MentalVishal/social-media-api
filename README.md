# Social Media API Documentation

Welcome to the documentation for the Social Media API. This API provides
functionalities for user registration, login, posting content,
following/unfollowing users, feed post and more.

## Getting Started

To get started with the Social Media API, follow the steps below:

### Prerequisites

- Node.js installed on your device
- MongoDB installed and running locally or access to a MongoDB
  instance

### Installation

1.  Clone the repository:
2.  Install dependencies:
3.  Start the server:

The server will start running on `http://localhost:8080` by default.

## API Endpoints

Here are the available endpoints and their functionalities:

<div class="endpoint">

### User Management

- **POST** `/register`: Register a new user.
- **POST** `/login`: Login user.
- **GET** `/users`: Get All Users
- **POST** `/users/blacklist/:userId`: Blacklist a user.
- **POST** `/users/unblacklist/:userId`: Remove a user from the
  blacklist.

</div>

<div class="endpoint">

### Post Management

- **POST** `/post`: Create a new post.
- **PATCH** `/updatePost`: Update an existing post.
- **DELETE** `/deletePost/:postId`: Delete a post.

</div>

<div class="endpoint">

### Following/Unfollowing Users

- **POST** `/follow/:userId`: Follow a user.
- **POST** `/unfollow/:userId`: Unfollow a user.

</div>

<div class="endpoint">

### Feed Retrieval

- **GET** `/feed`: Retrieve posts from users you follow.

</div>

<div class="endpoint">

### GraphQL

To explore the API using GraphQL, you can access the GraphQL Playground
at the following endpoint:

`/graphql`

</div>

## Testing the API

You can test the API endpoints using tools like Postman or by sending
requests directly from your application. Here's how you can test the
endpoints:

1.  Register a new user:

          POST http://localhost:8080/register
          Content-Type: application/json

          {
            "username": "exampleuser",
            "email": "user@example.com",
            "password": "password123"
          }

2.  Login user:

            POST http://localhost:8080/login
            Content-Type: application/json

            {
              "email": "user@example.com",
              "password": "password123"
            }

3.  Retrieve all users:

            GET http://localhost:8080/users
                Authorization: Bearer &lt;token&gt;

4.  Blacklist a user:

          POST http://localhost:8080/users/blacklist/:userId
          Authorization: Bearer
          Content-Type: application/json

          {
            "userId": "12345"
          }


5.  Remove a user from the blacklist:

          POST http://localhost:8080/users/unblacklist/:userId
          Authorization: Bearer
          Content-Type: application/json

          {
            "userId": "12345"
          }


6.  Create a new post:

          POST http://localhost:8080/post
          Authorization: Bearer &lt;token&gt;
          Content-Type: application/json

          {
            "content": "This is a new post."
          }

7.  Update an existing post:

        PATCH http://localhost:8080/updatePost
            Authorization: Bearer &lt;token&gt;
            Content-Type: application/json

            {
              "postId": "123456",
              "content": "Updated content for the post."
            }

8.  Delete a post:

          DELETE http://localhost:8080/deletePost/:postId
          Authorization: Bearer <token>
          Content-Type: application/json

          {
            "postId": "12345"
          }

9.  Follow a user:

        POST http://localhost:8080/follow/:userId
                Authorization: Bearer &lt;token&gt;

10. Unfollow a user:

        POST http://localhost:8080/unfollow/:userId
        Authorization: Bearer &lt;token&gt;

11. Retrieve posts from users you follow:

        GET http://localhost:8080/feed
        Authorization: Bearer &lt;token&gt;

# API Endpoints Explanation

<div class="endpoint">

## POST `/register`: Register a new user.

This endpoint allows a user to create a new account by providing a
username, email, and password in the request body. Upon successful
registration, the user's information is stored in the database.

</div>

<div class="endpoint">

## POST `/login` : Login user.

Users can authenticate themselves by sending a POST request with their
email and password. If the provided credentials match an existing user's
credentials in the database, the server responds with a JWT (JSON Web
Token) that can be used for authentication in subsequent requests.

</div>

<div class="endpoint">

## GET `/users` : Get All Users.

This endpoint retrieves a list of all users registered in the system. It
requires authentication via a JWT token in the request headers to ensure
only authorized users can access the user data.

</div>

<div class="endpoint">

## POST `/users/blacklist/:userId`: Blacklist a user.

This endpoint allows an administrator to blacklist a user by providing
the user's ID in the request URL. Once blacklisted, the user may be
restricted from accessing certain features or functionalities within the
application.

</div>

<div class="endpoint">

## POST `/users/unblacklist/:userId`: Remove a user from the blacklist.

This endpoint allows an administrator to remove a user from the
blacklist by providing the user's ID in the request URL. Once removed
from the blacklist, the user regains access to the application's
features and functionalities.

</div>

<div class="endpoint">

## POST `/post` : Create a new post.

Users can create new posts by sending a POST request with the content of
the post in the request body. The server associates the post with the
authenticated user and stores it in the database.

</div>

<div class="endpoint">

## POST `/updatePost/:postId`: Update a post.

This endpoint allows a user or an admin to update a post by providing
the post ID in the request URL. The requester must be the owner of the
post or an admin to perform the update.

</div>

<div class="endpoint">

## DELETE `/deletePost/:postId`: Delete a post.

This endpoint allows a user or an admin to delete a post by providing
the post ID in the request URL. The requester must be the owner of the
post or an admin to perform the delete operation.

</div>

<div class="endpoint">

## POST `/follow/:userId` : Follow a user.

This endpoint allows a user to follow another user. The `:userId`
parameter specifies the ID of the user to follow. Authentication is
required, and upon successful follow, the relationship is established in
the database.

</div>

<div class="endpoint">

## POST `/unfollow/:userId` : Unfollow a user.

Users can unfollow another user by sending a POST request with the ID of
the user to unfollow specified in the URL parameter `:userId`. The
server verifies the relationship and removes it from the database upon
successful unfollow.

</div>

<div class="endpoint">

## GET `/feed` : Retrieve posts from users you follow.

This endpoint fetches posts from users whom the authenticated user
follows. It requires authentication via a JWT token. The server
retrieves the relevant posts from the database and returns them as a
response.

</div>

## GraphQL

The API also supports GraphQL for querying data. You can access the
GraphQL Playground at `http://localhost:8080/graphql` and explore the
available queries and mutations.

## Contribution

Contributions to this project are welcome! If you find any issues or
have suggestions for improvements, feel free to open an issue or submit
a pull request.

## License

This project is licensed under the [MentalVishal](LICENSE).
