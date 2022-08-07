import mongoose from "mongoose";

const Product = new mongoose.Schema(
	{
		name: { type: String, required: true },
		stock: { type: Number, required: false },
		purchase_price: { type: Number, required: true },
		sales_price: { type: Number, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Products", Product);