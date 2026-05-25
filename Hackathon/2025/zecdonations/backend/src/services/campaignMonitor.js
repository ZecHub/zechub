class CampaignMonitor {
  constructor() {
    this.activeCampaigns = new Map();
  }

  startMonitoring() {
    console.log('Campaign monitoring started');
  }
}

export default new CampaignMonitor();