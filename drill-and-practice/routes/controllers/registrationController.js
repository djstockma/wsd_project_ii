import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = {
    errors: [],
    email: "",
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const email = params.get("email")
  const password = params.get("password");

  if(password.length < 4) {
    data.errors.push("Password needs to be at least 4 characters");
    data.email = email;
  }
  if(!validateEmail(email)) {
    data.errors.push("Not a valid email");
    data.email = email;
  };

  if(data.errors.length < 1) {
    await userService.addUser(
      email,
      await bcrypt.hash(password),
    );
    response.redirect("/auth/login");
  } else {
    render("registration.eta", data);
  }

};

const showRegistrationForm = ({ render }) => {
  render("registration.eta", {errors: [], email: ""});
};

export { registerUser, showRegistrationForm };