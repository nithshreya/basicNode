function authenticateRole(roles) {
  return (req, res, next) => {
    if (!req.requesterDetails) {
      res
        .status(401)
        .send({ error: "No requester details, not authorized" });
    }
    console.log(req.requesterDetails);
    let role = req.requesterDetails.role;
    if (roles.includes(role)) {
      next();
    } else {
      res
        .status(401)
        .send({ error: "you are not authorized to make this request" });
      console.log("you are not authorized to make this request");
    }
  };
}

function authenticateEdit(roles) {
  return (req, res, next) => {
    if (!req.requesterDetails) {
      res
        .status(401)
        .send({ error: "No requester details, not authorized" });
    }
    console.log(req.requesterDetails);
    let role = req.requesterDetails.role;
    if (roles.includes(role)) {
      next();
    } else if (req.params.id == req.requesterDetails._id) {
      next();
    } else {
      res
        .status(401)
        .send({ error: "you are not authorized to make this request" });
      console.log("you are not authorized to make this request");
    }
  };
}

module.exports = { authenticateRole, authenticateEdit };
