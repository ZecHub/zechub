class DiscordService {
  constructor() {
    this.users = new Map();
  }

  async getUserProfile(discordId) {
    // Mock implementation
    return {
      discord_id: discordId,
      username: 'mock_user',
      avatar: 'mock_avatar'
    };
  }
}

export default new DiscordService();