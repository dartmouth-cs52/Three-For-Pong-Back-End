import Listing from '../models/listing_model';

const GAME_SIZE = 4;

export const createListing = (req, res) => {
  const listing = new Listing();
  listing.location = req.body.location;
  listing.host_user = req.body.host_user;
  listing.users = [];
  listing.num_looking_for_game = req.body.num_looking_for_game;
  listing.start_time = Date.parse(req.body.start_time);
  listing.save()
  .then(result => {
    res.json({ message: 'Listing created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getListings = (req, res) => {
  Listing.find()
  .sort('-start_time')
  .populate('location host_user')
  .exec((error, listings) => {
    res.json(listings.map(listing => {
      return {
        listing_id: listing._id,
        location: listing.location,
        host_user: listing.host_user,
        num_still_needed_for_game: GAME_SIZE - listing.num_looking_for_game - listing.users.length,
        start_time: listing.start_time,
      };
    }));
  });
};

export const updateListing = (req, res) => {
  Listing.update({ _id: req.params.listingID }, {
    location: req.body.location,
    host_user: req.body.host_user,
    num_looking_for_game: req.body.num_looking_for_game,
    start_time: req.body.start_time,
  }, {}, (error, raw) => {
    if (error === null) {
      res.json({ message: 'Listing updated!' });
    } else {
      res.json({ error });
    }
  });
};

export const removeListing = (req, res) => {
  Listing.remove({ _id: req.params.listingID }, (error, listings) => {
    if (error === null) {
      res.json({ message: 'Listing removed!' });
    } else {
      res.json({ error });
    }
  });
};

export const joinListing = (req, res) => {
  // First, retrieve the Users[] array for the listing
  Listing.find({ _id: req.params.listingID }).limit(1).exec((findError, listings) => {
    // Retrieve first element in array
    const listing = listings[0];
    // Add the new user to the array and update it back in the database
    listing.users.push(req.body.user_id);
    Listing.update({ _id: req.params.listingID }, {
      users: listing.users,
    }, {}, (updateError, raw) => {
      if (updateError === null) {
        res.json({ message: 'A user joined this listing!' });
      } else {
        res.json({ updateError });
      }
    });
  });
};

export const leaveListing = (req, res) => {
  // First, retrieve the Users[] array for the listing
  Listing.find({ _id: req.params.listingID }).limit(1).exec((findError, listings) => {
    // Retrieve first element in array
    const listing = listings[0];
    // Remove the user from the array and update it back in the database
    listing.users = listing.users.filter((userId) => {
      return userId !== req.body.user_id;
    });
    Listing.update({ _id: req.params.listingID }, {
      users: listing.users,
    }, {}, (updateError, raw) => {
      if (updateError === null) {
        res.json({ message: 'A user left this listing!' });
      } else {
        res.json({ updateError });
      }
    });
  });
};
