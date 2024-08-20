import User from "../../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username: username.toLowerCase(),
      email,
      password: hash,
      role,
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyValue && error.keyValue.email) {
      res.status(400).json("Email already exists");
    } else if (
      error.code === 11000 &&
      error.keyValue &&
      error.keyValue.username
    ) {
      res.status(400).json("Username already exists");
    } else {
      res.status(500).send("An error occurred while creating the user");
    }
  }
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
          const token = jwt.sign(
            { userId: user._id },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "1h",
            }
          );
          res.cookie("token", token, {
            httpOnly: true,
          });
          res.status(200).json({
            user: user,
            token: token,
          });
        } else {
          res.status(401).json("Invalid password");
        }
      });
    })
    .catch((error) => {
      res.status(500).send("An error occurred while logging in");
    });
};

export const updateUser = async (req, res, next) => {
  const { name, email, username, password, role, newPassword, about } =
    req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(401).json({ message: "Username already in use" });
      }
      user.username = username;
    }

    if (name) {
      user.name = name;
    }

    if (role) {
      user.role = role;
    }

    if (about) {
      user.about = about;
    }

    if (password) {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Password you entered is incorrect" });
      } else {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
      }
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

export default updateUser;

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
    const user = await User.findOne({ email: email });
    if (user) {
      res.json("User already present on Workwise");
    } else {
      res.json(`Invitation sent to ${email}`);
    }
  }
};
