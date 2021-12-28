"use strict";

const { v4: uuid } = require("uuid");

module.exports = {
  lifecycles: {
    beforeCreate: async (model) => {
      if (!model.uuid) {
        model.uuid = uuid();
      }
    },
  },
};
