import passport from "passport";
import Authentication from "../auth/Authentication";
import TokenFilter from "../auth/TokenFilter";

const init = () => {
  passport.use(Authentication.strategy);
  passport.use(TokenFilter.strategy);
};

export default { init };
