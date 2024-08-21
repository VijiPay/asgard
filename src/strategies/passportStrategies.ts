import type { Request } from "express";
import passport from "passport";
import {
	type Profile as FacebookProfile,
	Strategy as FacebookStrategy,
} from "passport-facebook";
import {
	type Profile as GoogleProfile,
	Strategy as GoogleStrategy,
} from "passport-google-oauth20";
import { inject, singleton } from "tsyringe";
import { AuthComponents } from "../modules/auth/constants/AuthComponents";
import type { IRegisterService } from "../modules/auth/interfaces/IRegisterService";
import { UserComponents } from "../modules/user/constants/UserComponents";
import type { IGetUserService } from "../modules/user/interface/IGetUserService";
import type { IUser } from "../modules/user/interface/IUser";
import { OAuthClient } from "./config";

@singleton()
export class PassportStrategies {
	constructor(
		@inject(UserComponents.GetUserService)
		private getUserService: IGetUserService,
		@inject(AuthComponents.RegisterService)
		private registerUserService: IRegisterService,
	) {
		this.initializeGoogleStrategy();
		this.initializeFacebookStrategy();
		this.serializeUser();
		this.deserializeUser();
	}
	private userProfile = (profile: GoogleProfile | FacebookProfile) => {
		const data = {
			firstName: profile.name?.givenName as string,
			lastName: profile.name?.familyName as string,
			email: profile.emails?.[0].value as string,
			password: "string",
			countryCode: "N/A",
			authId: `google${profile.id}`,
		};

		return data;
	};

	private initializeGoogleStrategy() {
		passport.use(
			new GoogleStrategy(
				{
					clientID: OAuthClient.GOOGLE_CLIENT_ID,
					clientSecret: OAuthClient.GOOGLE_CLIENT_SECRET,
					callbackURL: OAuthClient.GOOGLE_CALLBACK_URL,
					scope: ["profile", "email"],
					passReqToCallback: true,
				},
				async (
					req: Request,
					accessToken: string,
					refreshToken: string,
					profile: GoogleProfile,
					callback,
				) => {
					let user = this.getUserService.findByGoogleId(profile.id);
					if (!user) {
						await this.registerUserService.register({
							firstName: profile.name?.givenName as string,
							lastName: profile.name?.familyName as string,
							email: profile.emails?.[0].value as string,
							password: "",
							countryCode: "N/A",
							authId: `google${profile.id}`,
						});
					}
					user = user = this.getUserService.findByGoogleId(profile.id);
					callback(null, this.userProfile(profile));
				},
			),
		);
	}

	private initializeFacebookStrategy() {
		passport.use(
			new FacebookStrategy(
				{
					clientID: OAuthClient.FACEBOOK_CLIENT_ID,
					clientSecret: OAuthClient.FACEBOOK_CLIENT_SECRET,
					callbackURL: OAuthClient.FACEBOOK_CALLBACK_URL,
					profileFields: ["id", "name", "emails"],
					passReqToCallback: true,
				},
				async (
					req: Request,
					accessToken: string,
					refreshToken: string,
					profile: FacebookProfile,
					callback,
				) => {
					let user = this.getUserService.findByFacebookId(profile.id);
					if (!user) {
						await this.registerUserService.register({
							firstName: profile.name?.givenName as string,
							lastName: profile.name?.familyName as string,
							email: profile.emails?.[0].value as string,
							password: "",
							countryCode: "N/A",
							authId: `facebook${profile.id}`,
						});
					}
					user = user = this.getUserService.findByFacebookId(profile.id);
					callback(null, this.userProfile(profile));
				},
			),
		);
	}

	private serializeUser() {
		passport.serializeUser(
			(
				user: Partial<IUser>,
				done: (err: Error | null, id?: unknown) => void,
			) => {
				const passportUser: Partial<IUser> = { id: user.id };
				done(null, passportUser.id);
			},
		);
	}

	private deserializeUser() {
		passport.deserializeUser(
			async (
				id: number,
				done: (err: Error | null, user?: IUser | null) => void,
			) => {
				const user = await this.getUserService.findRaw(id);
				done(null, user);
			},
		);
	}
}
