const { Outcome, OutcomeProduct, OutcomeType } = require("../models/outcomeModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

function getProductCounts(products) {
  const productCounts = {};
  if (!products) return productCounts; // Handle case when products array is undefined
  for (const product of products) {
    const [productId, count] = Object.entries(product)[0];
    if (productId && count) {
      productCounts[productId] = count;
    }
  }
  return productCounts;
}

class OutcomeController {
  static async createOutcome(req, res) {
    try {
      const { type, description, userId, products, price } = req.body;

      const outcomeType = await OutcomeType.findByPk(type);
      // Make sure the 'type' field is either 'service' or 'product'
      if (!outcomeType) {
        return res
          .status(400)
          .json({
            error:
              "Invalid outcome type.",
          });
      }

      const user = await User.findByPk(userId);
      console.log("USERRRR ---> ", user);

      // Ensure the 'userId' field is provided
      if (!userId || !user) {
        return res
          .status(400)
          .json({ error: "User ID doesn't match with our records." });
      }

      // Convert the incoming products array to the desired format
      const productCounts = getProductCounts(products);
      const formattedProducts = Object.entries(productCounts).map(
        ([id, count]) => ({ id, count })
      );

      const newOutcome = await Outcome.create({
        outcomeType: outcomeType.dataValues.id,
        description: description,
        userId: user.dataValues.id,
        price: price,
        Products: formattedProducts, // Store the products in the desired format
      });
      let formattedBulk = [];
      formattedProducts.forEach(async (product) => {
        formattedBulk.push({
          OutcomeId: newOutcome.dataValues.id,
          ProductId: product.id,
          count: product.count,
        });
        const productToUpdate = await Product.findByPk(product.id);
        productToUpdate.set('quantity', Number(productToUpdate.dataValues.quantity) + Number(product.count));
        productToUpdate.save();
      });
      await OutcomeProduct.bulkCreate(formattedBulk);



      res.status(201).json(newOutcome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllOutcomes(req, res) {
    try {
      const outcomes = await Outcome.findAll({
        attributes: ["id", "description", "price", "userId"],
        include: [
          {
            model: Product,
            attributes: ["id", "name"],
            through: {
              attributes: ["count", "ProductId"],
            },
          },
          {
            model: OutcomeType,
            attributes: ["id", "name"],
          },
        ],
      });

      const formattedOutcomes = outcomes.map((outcome) => {
        return { ...outcome.toJSON() };
      });

      res.status(200).json(formattedOutcomes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getOutcome(req, res) {
    try {
      const outcomeId = req.params.id;
      const outcome = await Outcome.findByPk(outcomeId, {
        attributes: ["id", "outcomeType", "description", "price", "userId"],
        include: [
          {
            model: Product,
            attributes: ["id", "name", "description", "quantity", "price"],
            through: {
              attributes: ["count"],
            },
          },
        ],
      });
      console.log("OUTCOME ---> ", outcome.dataValues);
      if (!outcome) {
        return res.status(404).json({ error: "Outcome not found." });
      }

      const outcomeWithProducts = outcome.toJSON();

      res.status(200).json(outcomeWithProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateOutcome(req, res) {
    try {
      const outcomeId = req.params.id;
      const outcome = await Outcome.findByPk(outcomeId);

      if (!outcome) {
        return res.status(404).json({ error: "Outcome not found." });
      }

      const { type, description, userId, products } = req.body;

      // Make sure the 'type' field is either 'service' or 'product'
      if (type && !["service", "product"].includes(type)) {
        return res.status(400).json({
          error: "Invalid outcome type. Type should be 'service' or 'product'.",
        });
      }

      // Ensure the 'userId' field is provided
      if (userId === undefined) {
        return res
          .status(400)
          .json({ error: "User ID is required to update an outcome." });
      }

      // You may want to perform additional validation or checks for 'products' if needed.

      await outcome.update({
        type: type || outcome.type,
        description: description || outcome.description,
        userId: userId || outcome.userId,
      });

      // Associate products with the updated outcome if 'products' array is provided
      if (products && products.length > 0) {
        await outcome.setProducts(products);
      }

      res.status(200).json(outcome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteOutcome(req, res) {
    try {
      const outcomeId = req.params.id;
      const outcome = await Outcome.findByPk(outcomeId);

      if (!outcome) {
        return res.status(404).json({ error: "Outcome not found." });
      }

      await outcome.destroy();

      res.status(200).json(outcome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getOutcomeTypes(req, res) {
    try {
      const outcomes = await OutcomeType.findAll();
      res.status(200).json(outcomes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = OutcomeController;
