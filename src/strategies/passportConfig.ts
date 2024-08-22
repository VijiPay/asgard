import session from "express-session";
import passport from "passport";
import { container } from "tsyringe";
import { server } from "../server";
import { Config } from "../shared/services/config/Config";

const config = container.resolve(Config);

server.use(
	session({
		secret: config.defined<string>("SECRET"),
		resave: false,
		saveUninitialized: false,
	}),
);
server.use(passport.initialize());
server.use(passport.session());

server.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] }),
);

server.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "/ag/v1/user/find-by-id?id=1",
		failureRedirect: "/login",
	}),
);

server.get(
	"/auth/facebook",
	passport.authenticate("facebook", { scope: ["email"] }),
);

server.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: "ag/v1/user/find-by-id?id=1",
		failureRedirect: "/login",
	}),
);
