"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // Create order with linked user
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.order.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.order.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.order });
  },
  // Update user order
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [order] = await strapi.services.order.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    // if (!order) {
    //   return ctx.unauthorized(`You can't update this entry sir`);
    // }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.order.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.order.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.order });
  },
  // Delete a user order
  async delete(ctx) {
    const { id } = ctx.params;

    const [order] = await strapi.services.order.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!order) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const entity = await strapi.services.order.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.order });
  },
  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const data = await strapi.services.order.find({ user: user.id });

    if (!data) {
      return ctx.notFound();
    }

    return sanitizeEntity(data, { model: strapi.models.order });
  },
};
