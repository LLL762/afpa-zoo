import passport from "passport";
import Authentication from "../auth/Authentication";

const init = () => {
  passport.use(Authentication.strategy);
};

export default { init };
