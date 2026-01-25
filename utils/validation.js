

const validateUpdateProfile = (req) => {
  const allowedUpdates = ["firstName", "lastName", "age", "gender", "bio", "profilePicture", "skills"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  return isValidOperation;
}

module.exports = { validateUpdateProfile };