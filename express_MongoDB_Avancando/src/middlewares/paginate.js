import IncorretRequest from "../errors/IncorrectRequest.js";

async function paginate(req, res, next) {
  try {
    let { limit = 5, page = 1, ordering = "_id:-1" } = req.query;

    let [orderingField, order] = ordering.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const paginatedResult = await result
        .find()
        .sort({ [orderingField]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      res.status(200).json(paginatedResult);
    } else {
      next(new IncorretRequest());
    }
  } catch (error) {
    next(error);
  }
}

export default paginate;