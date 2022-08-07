import Product from "../models/ProductModel.js";

const getProducts = async (req, res) => {
	await Product.find()
		.then(products => res.status(200).json(products))
		.catch(err => res.status(500).json({ message: err.message }));
}

const getProductById = async (req, res) => {
	await Product.findById(req.params.id)
		.then(product => res.status(200).json(product))
		.catch(err => res.status(404).json({ message: err.message }));
}

const storeProduct = async (req, res) => {
	const request = new Product(req.body);
	await request.save()
		.then(product => res.status(200).json({ message: "Success" }, product))
		.catch(err => res.status(405).json({ message: err.message }));
}

const updateProduct = async (req, res) => {
	const { name, sales_price, purchase_price } = req.body;
	await User.updateOne(
		{ _id: req.params.id },
		{ name, sales_price, purchase_price },
	).then(() => res.status(200).json({ message: "Success" }))
	.catch(err => res.status(405).json({ message: err.message }));
}

const destroyProduct = async (req, res) => {
	await Product.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: "Success" }))
		.catch(err => res.status(404).json({ message: err.message }));
}

export { getProducts, getProductById, storeProduct, updateProduct, destroyProduct };