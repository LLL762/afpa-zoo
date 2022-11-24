import passport from "passport";
import Authentication from "../auth/Authentication";
import JwtRefresh from "../auth/JwtRefresh";
import TokenFilter from "../auth/TokenFilter";

const init = () => {
  passport.use(Authentication.strategy);
  passport.use(TokenFilter.strategy);
  passport.use(JwtRefresh.strategy);
};

export default { init };
