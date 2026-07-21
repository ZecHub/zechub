const { getDB } = require("../config/db");

const UsersTable = "users";

const User = {
  async findOne({ hashedIdentity }) {
    const db = getDB();
    const { data, error } = await db
      .from(UsersTable)
      .select("*")
      .eq("hashed_identity", hashedIdentity)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data ? User._format(data) : null;
  },

  async create({ hashedIdentity }) {
    const db = getDB();
    const { data, error } = await db
      .from(UsersTable)
      .insert({
        hashed_identity: hashedIdentity,
        tier: "FREE",
        agent_config: {
          isActive: false, riskLevel: "MEDIUM", maxAllocation: 20,
          maxPositions: 5, globalTP: 300, globalSL: 25, scanInterval: 30,
          enabledChains: { SOLANA: true, BSC: true, ETH: true, ZEC: true },
          autoStable: true, honeyCheck: true, liqCheck: true,
          dcaLadder: false, sentimentTrack: false,
        },
        stats: { totalTrades: 0, totalWins: 0, totalLosses: 0 },
        last_seen: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return User._format(data);
  },

  async updateLastSeen(hashedIdentity) {
    const db = getDB();
    const { error } = await db
      .from(UsersTable)
      .update({ last_seen: new Date().toISOString() })
      .eq("hashed_identity", hashedIdentity);
    if (error) throw error;
  },

  async updateConfig(hashedIdentity, config) {
    const db = getDB();
    const { data, error } = await db
      .from(UsersTable)
      .update({ agent_config: config })
      .eq("hashed_identity", hashedIdentity)
      .select()
      .single();
    if (error) throw error;
    return User._format(data);
  },

  _format(row) {
    return {
      hashedIdentity: row.hashed_identity,
      tier:           row.tier,
      agentConfig:    row.agent_config,
      stats:          row.stats,
      lastSeen:       row.last_seen,
      save: async function () {
        await User.updateLastSeen(this.hashedIdentity);
      },
    };
  },
};

module.exports = User;