import User from "../../models/userSchema.js";
import bcrypt from "bcrypt";

export const getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while retrieving users");
    });
};

export const getUser = async (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json("User not found");
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while retrieving the user");
    });
};

export const createUser = async (req, res, next) => {
  const { name, username, email, password, role } = req.body;

  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while creating the user");
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("An error occurred while creating the user");
      }

      const newUser = new User({
        name,
        username: username.toLowerCase(),
        email,
        password: hash,
        role,
      });

      newUser
        .save()
        .then(() => {
          res.status(200).send("User created successfully");
        })
        .catch((error) => {
          console.error(error);
          if (error.code === 11000 && error.keyValue && error.keyValue.email) {
            res.status(400).json("Email already exists");
          }
          if (
            error.code === 11000 &&
            error.keyValue &&
            error.keyValue.username
          ) {
            res.status(400).json("Username already exists");
          } else {
            res.status(500).send("An error occurred while creating the user");
          }
        });
    });
  });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found");
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json("An error occurred while logging in");
        }

        if (result) {
          res.status(200).json(user);
        } else {
          res.status(401).json("Invalid password");
        }
      });
    })
    .catch((error) => {
      res.status(500).send("An error occurred while logging in");
    });
};

export const updateUser = (req, res, next) => {
  const { name, email, username, password, role } = req.body;

  User.findOneAndUpdate(
    { email },
    { name, username, password, role },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while updating the user");
    });
};

export const deleteUser = (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).send("User not found");
      }
      res.status(200).json({ message: "Account successfully deleted" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while updating the user");
    });
};

export const inviteUser = async (req, res, next) => {
  const email = req.body.email;
  if (email) {
    const user = await User.findOne({email: email});
    if (user) {
      res.json("User already present on Workwise");
    } else {
      res.json(`Invitation sent to ${email}`);
    }
  }
};
