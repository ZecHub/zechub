export class AuthController {
  static async getCurrentUser(req, res) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({
      success: true,
      user: {
        discordId: req.user.discord_id,
        username: req.user.username,
        avatar: req.user.avatar
      }
    });
  }

  static async logout(req, res) {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: 'Logout failed' });
      res.json({ success: true, message: 'Logged out successfully' });
    });
  }
}