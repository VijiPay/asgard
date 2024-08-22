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
import type { IUpdateUserService } from "../modules/user/interface/IUpdateUserService";
import type { IUser } from "../modules/user/interface/IUser";
import { OAuthClient } from "./config";

@singleton()
export class PassportStrategies {
	constructor(
		@inject(UserComponents.GetUserService)
		private getUserService: IGetUserService,
		@inject(AuthComponents.RegisterService)
		private registerUserService: IRegisterService,
		@inject(UserComponents.UpdateUserService)
		private updateUserService: IUpdateUserService,
	) {
		this.initializeGoogleStrategy();
		this.initializeFacebookStrategy();
		this.serializeUser();
		this.deserializeUser();
	}
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
					done,
				) => {
					const userData = {
						firstName: profile.name?.givenName as string,
						lastName: profile.name?.familyName as string,
						email: profile.emails?.[0].value as string,
						password: null,
						countryCode: null,
						profile: {
							googleId: profile.id,
							emailVerified: profile.emails?.[0].verified as boolean,
						},
					};
					let user = await this.getUserService.findByGoogleId(profile.id);
					if (!user) {
						const existingUser = await this.getUserService.findByEmail(
							profile.emails?.[0].value as string,
						);

						if (existingUser) {
							await this.updateUserService.update(existingUser.id, {
								profile: { googleId: profile.id },
							});
							return existingUser;
						}
						await this.registerUserService.register(userData);
					}

					user = await this.getUserService.findByGoogleId(profile.id);
					return done(null, user as IUser);
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
					enableProof: true,
				},
				async (
					req: Request,
					accessToken: string,
					refreshToken: string,
					profile: FacebookProfile,
					done,
				) => {
					const userData = {
						firstName: profile.name?.givenName as string,
						lastName: profile.name?.familyName as string,
						email: profile.emails?.[0].value as string,
						password: null,
						countryCode: null,
						profile: {
							facebookId: profile.id,
						},
					};
					let user = await this.getUserService.findByFacebookId(profile.id);
					if (!user) {
						const existingUser = await this.getUserService.findByEmail(
							profile.emails?.[0].value as string,
						);

						if (existingUser) {
							await this.updateUserService.update(existingUser.id, {
								profile: { facebookId: profile.id },
							});
							return existingUser;
						}
						await this.registerUserService.register(userData);
					}

					user = await this.getUserService.findByFacebookId(profile.id);
					return done(null, user as IUser);
				},
			),
		);
	}

	private serializeUser() {
		passport.serializeUser((user, done) => {
			console.log("serializing", user);
			done(null, (user as IUser).id);
		});
	}

	private deserializeUser() {
		passport.deserializeUser(async (id: number, done) => {
			const user = await this.getUserService.findRaw(id);
			done(null, user);
		});
	}
}
