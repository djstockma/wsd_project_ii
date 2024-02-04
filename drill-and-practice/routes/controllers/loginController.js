import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = {
    errors: [],
  }

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );

  if (userFromDatabase.length != 1) {
    data.errors.push("No such user found");
  }
  const user = userFromDatabase[0];
  var passwordMatches = false
  if(data.errors.length < 1) {
    passwordMatches = await bcrypt.compare(
      params.get("password"),
      user.password,
    );
  }
  
  if (!passwordMatches) {
    data.errors.push("Faulty password");
  }

  if (data.errors.length > 0) {
    render("login.eta", data);
  } else {
    await state.session.set("user", user);
    response.redirect("/topics");
  }
};

const showLoginForm = ({ render }) => {
  render("login.eta", {errors: []});
};

export { processLogin, showLoginForm };