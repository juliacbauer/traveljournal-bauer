const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
    },
    //Adding to schema so favorites list data
    //can associate with user data
    favorites: [
      {
        name: String,
        state: String,
        description: String,
        attraction1: String,
        attraction2: String,
        attraction3: String,
        attraction4: String,
        attraction5: String,
        tip: String
      }
    ]
  },
  {
    methods: {
      checkPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);

// hashes the password before it's stored in mongo
UserSchema.pre("save", async function (next) {
  // the isNew check prevents mongoose from re-hashing the password when the user is updated for any reason
  if (this.isNew)
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = models.User || model("User", UserSchema);
