class Engine {
    /** @param {object} cfg */
    constructor(cfg = {}) { this.cfg = cfg; }

    /** Init engine 
     * @param {string} ua 
     */
    async start(ua) {}

    /** Post message
     *  @param {string} message
     */
    async post(message) {}
}

module.exports = Engine;

