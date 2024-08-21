import { container } from "tsyringe";
import { Config } from "../../shared/services/config/Config";

const config = container.resolve(Config);

const GOOGLE_CALLBACK_URL = config.defined<string>("GOOGLE_CALLBACK_URL");
const GOOGLE_CLIENT_ID = config.defined<string>("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = config.defined<string>("GOOGLE_CLIENT_SECRET");

const FACEBOOK_CALLBACK_URL = config.defined<string>("FACEBOOK_CALLBACK_URL");
const FACEBOOK_CLIENT_ID = config.defined<string>("FACEBOOK_CLIENT_ID");
const FACEBOOK_CLIENT_SECRET = config.defined<string>("FACEBOOK_CLIENT_SECRET");

export const OAuthClient = {
	GOOGLE_CALLBACK_URL,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	FACEBOOK_CALLBACK_URL,
	FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET,
};
