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
    //Adding to schema so explored list data
    //can associate with user data
    explored: [
      {
        type: Schema.Types.ObjectId,
        ref: 'City'
      }
    ],
    //Adding to schema so unexplored list data
    //can associate with user data
    unexplored: [
      {
        type: Schema.Types.ObjectId,
        ref: 'City'
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
