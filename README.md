
# Three-For-Pong-Back-End

* mongodb hosted on heroku
* node with babel
* expressjs
* airbnb eslint rules

## API Endpoints
### Users
* `POST /api/users/` with post parameters `{'full_name', 'phone', 'can_host', 'default_location_id'}` creates a new user
* `PUT /api/users/:userID` with parameters `{'full_name', 'phone', 'can_host', 'default_location_id' }` updates a user
* `GET /api/users/:userID` returns a user's info in the form `{'full_name', 'phone', 'can_host', 'default_location_id'}`

### Locations
* `POST /api/locations/` with post parameters `{'location_name'}` creates a new location
* `GET /api/locations/` returns all locations in the form `[{location_id: '123', location_name: 'Baker Library'}, {...}, ...]`

### Listings
* `POST /api/listings/` with post parameters `{'location_id', 'host_user_id', 'num_looking_for_game', 'start_time'}`
* `GET /api/listings/` returns all listings in the form `{'listing_id', 'location_id', 'host_user_id', 'num_still_needed_for_game', 'start_time'}`
* `PUT /api/listings/:listingID` with parameters `{'location_id', 'host_user_id', 'num_looking_for_game', 'start_time'}` updates a listing
* `DELETE /api/listings/:listingID` deletes the listing
* `POST /api/listings/join/:listingID` with parameter `{'user_id'}` will join a listing
* `POST /api/listings/leave/:listingID` with parameter `{'user_id'}` will leave a listing

**NOTE: `num_looking_for_game` is part of Listing's schema, which represents the number of people that the host already knows will play (including the host, so if the host is with his friend trying to play, this number would be two). On the contrary, `num_still_needed_for_game` is calculated by the server, which is the number of people still needed to bring the game to a total of four players (in the host example above, this would also be two, since two are hosting (=num_looking_for_game), and two are needed (=num_still_needed_for_game).**

## Data Structures

### Users
*	user_id (unique string generated by Mongo)
*	full_name (string)
*	phone (unique, int)
*	can_host (boolean)
*	default_location_id (string from Locations)
*	date_joined

### Locations
*	location_id (unique string generated by Mongo)
*	location_name (string)

### Listings
*	listing_id (unique string generated by Mongo)
*	location_id (string from Locations)
*	host_user_id (string from Users)
*	users (array of Strings, user id's)
*	num_looking_for_game (number of people the host has, including him/herself; if he needs 3fp, this would be 1)
*	start_time (UTC time when the game will start)
*	posted_time (UTC time when the listing was posted)


Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)
=======
