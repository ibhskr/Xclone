// db.products.aggregate([
//   { $match: { price: { $gt: 1200 } } },
//   {
//     $group: {
//       _id: "$price",
//       allColors: { $push: "$colors" },
//     },
//   },
// ]);
