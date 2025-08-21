const bcrypt = require("bcryptjs");

bcrypt.hash("Thisismyfirstblog@123", 10, (err, hash) => {
  if(err) console.error(err);
  else console.log(hash);
});
