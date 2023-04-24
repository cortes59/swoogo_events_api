const Swoogo = require("../../lib/Swoogo");

module.exports = {
  getById: async (req, res) => {
    const { id } = req.params;
    const event = await Swoogo.getEventById(id);

    return res.json(event);
  },
};
