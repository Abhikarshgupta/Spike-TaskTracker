var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (user, done) {
	done(null, user);
});
passport.use(
	new GoogleStrategy(
		{
			clientID:
				"827647702278-3kdef7ru4itgl92tidai5l42glsp1ppt.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "http://localhost:5000/auth/google/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			var userData = {
				email: profile.emails[0].value,
				name: profile.displayName,
				token: accessToken,
			};
			done(null, userData);
		}
	)
);
