import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { User } from "../src/models/User.js";

function getCallbackURL() {
  if (process.env.NODE_ENV === "production") {
    return "https://teslasdev.com/api/auth/discord/callback";
  } else {
    return "http://localhost:3000/api/auth/discord/callback";
  }
}

export function setupDiscordAuth() {
  passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: getCallbackURL(),
        scope: ["identify", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findByDiscordId(profile.id);

          if (!user) {
            user = await User.create({
              discordId: profile.id, // ✅ This is 'discordId'
              username: profile.username,
              discriminator: profile.discriminator,
              avatar: profile.avatar,
              email: profile.email,
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  // ✅ FIXED: Use discordId (not discord_id)
  passport.serializeUser((user, done) => {
    console.log("Serializing user with discordId:", user.discord_id);
    done(null, user.discord_id); // ✅ Matches your model property
  });

  passport.deserializeUser(async (discord_id, done) => {
    try {
      console.log("Deserializing discordId:", discord_id);
      const user = await User.findByDiscordId(discord_id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}
