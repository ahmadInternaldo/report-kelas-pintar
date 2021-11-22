const errorHandler = (err, req, res, next) => {
  if (err.detailedCode === "Email/Password Wrong!") res.status(404).json(err.detailedCode);
  else if (err.detailedCode === "invalid token" || err.detailedCode === "Invalid Authentication") res.status(403).json("Login First!");
  else if (err.detailedCode === "Cannot read property 'UserId' of null") res.status(401).json("you are not allowed to change the task");
  else if (err.detailedCode === 'Unauthorized') res.status(404).json({message: 'you are not authorize!'})
  else if (err.detailedCode.length >= 1) res.status(401).json("Error In Validation");
  else res.status(500).json("Internal Server Error");
};

module.exports = errorHandler;
