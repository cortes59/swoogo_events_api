const Swoogo = require("../../lib/Swoogo");

module.exports = {
  getAll: async (req, res) => {
    const { page, perPage, eventId } = req.query;
    const data = await Swoogo.getEventSessions(eventId, page, perPage);
    return res.json(data);
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const event = await Swoogo.getEventSessionById(id);

    return res.json(event);
  },
};
