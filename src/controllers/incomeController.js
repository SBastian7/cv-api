const { Income, IncomeProduct } = require("../models/incomeModel");
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

class IncomeController {
    static async createIncome(req, res) {
        try {
          const { userId, products } = req.body;
      
          // You can add validations or checks for 'type' and other fields here if needed
      
          const user = await User.findByPk(userId);
      
          // Ensure the 'userId' field is provided and valid
          if (!userId || !user) {
            return res
              .status(400)
              .json({ error: "User ID doesn't match with our records." });
          }
      
          if (!products || !products.length) {
            return res.status(400).json({ error: "Products are required." });
          }
          const validProductIds = products.map(
            (product) => Object.keys(product)[0]
          );
          const foundProducts = await Product.findAll({
            where: {
              id: validProductIds,
            },
          });
      
          let totalPrice = 0;
      
          for (const product of products) {
            const productId = Object.keys(product)[0];
            const productCount = Object.values(product)[0];
            const productToUpdate = foundProducts.find(
              (foundProduct) => foundProduct.id === productId
            );
      
            if (!productToUpdate) {
              return res
                .status(400)
                .json({ error: "Invalid product ID provided." });
            }
      
            if (productCount > productToUpdate.quantity) {
              return res
                .status(400)
                .json({ error: "There are not enough products for this order." });
            }
      
            totalPrice += productToUpdate.price * productCount;
          }
      
          // Create the income
          const newIncome = await Income.create({
            userId,
            price: totalPrice,
          });
      
          // Update the products and create the bulk records
          const formattedBulk = products.map((product) => {
            const productId = Object.keys(product)[0];
            const productCount = Object.values(product)[0];
            const productToUpdate = foundProducts.find(
              (foundProduct) => foundProduct.id === productId
            );
      
            productToUpdate.quantity -= productCount;
            productToUpdate.save();
      
            return {
              IncomeId: newIncome.id,
              ProductId: productId,
              count: productCount,
            };
          });
      
          await IncomeProduct.bulkCreate(formattedBulk);
      
          res.status(201).json(newIncome);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
      

  static async getAllIncomes(req, res) {
    try {
      const incomes = await Income.findAll({
        attributes: ["id", "price", "userId", "createdAt"],
        include: [
          {
            model: Product,
            attributes: ["id", "name"],
            through: {
              attributes: ["count", "ProductId"],
            },
          },{
            model: User,
            attributes: ["id", "name", "username"],
          }
          // You can include other models if needed
        ],
      });

      const formattedIncomes = incomes.map((income) => {
        return { ...income.toJSON() };
      });

      res.status(200).json(formattedIncomes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getIncome(req, res) {
    try {
      const incomeId = req.params.id;
      const income = await Income.findByPk(incomeId, {
        attributes: ["id", "price", "createdAt"],
        include: [
          {
            model: Product,
            attributes: ["id", "name", "quantity", "price"],
            through: {
              attributes: ["count"],
            },
          },{
            model: User,
            attributes: ["id", "name", "username"],
          }
          // You can include other models if needed
        ],
      });

      if (!income) {
        return res.status(404).json({ error: "Income not found." });
      }

      const incomeWithProducts = income.toJSON();

      res.status(200).json(incomeWithProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateIncome(req, res) {
    try {
      const incomeId = req.params.id;
      const income = await Income.findByPk(incomeId);

      if (!income) {
        return res.status(404).json({ error: "Income not found." });
      }

      const { type, description, userId, products } = req.body;

      // Make sure the 'type' field is either 'service' or 'product'
      if (type && !["service", "product"].includes(type)) {
        return res.status(400).json({
          error: "Invalid income type. Type should be 'service' or 'product'.",
        });
      }

      // Ensure the 'userId' field is provided
      if (userId === undefined) {
        return res
          .status(400)
          .json({ error: "User ID is required to update an income." });
      }

      // You may want to perform additional validation or checks for 'products' if needed.

      await income.update({
        type: type || income.type,
        description: description || income.description,
        userId: userId || income.userId,
      });

      // Associate products with the updated income if 'products' array is provided
      if (products && products.length > 0) {
        await income.setProducts(products);
      }

      res.status(200).json(income);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteIncome(req, res) {
    try {
      const incomeId = req.params.id;
      const income = await Income.findByPk(incomeId);

      if (!income) {
        return res.status(404).json({ error: "Income not found." });
      }

      await income.destroy();

      res.status(200).json(income);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getIncomeTypes(req, res) {
    try {
      const incomeTypes = await OutcomeType.findAll();
      res.status(200).json(incomeTypes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = IncomeController;
