import { mockProducts } from 'src/_mocks_/products.mocks';
import { Product } from 'src/graphql/models';

export const seedProduct = async () => {
	console.log('mockProducts', mockProducts[0]);

	for (const prod of mockProducts) {
		console.log('prod', prod);

		const productId = await Product.createQueryBuilder()
			.insert()
			.into(Product)
			.values(prod)
			.execute()
			.then((res) => res.raw[0].id);
		await Product.createQueryBuilder()
			.relation(Product, 'categories')
			.of(productId)
			.add(prod.category_id)
			.then((res) => res);

		// console.log(prod);
		// const product = new Product();
		// product.name = prod.name;
		// product.description = prod.description;
		// product.price = prod.price;
		// product.slug = prod.slug;
		// product.product_image = prod.product_image;
		// await product.save();
		// // product.collections = [];
		// // product.categories = [];
		// // product.orderItems = [];
		// console.log(product);
		// await Product.save({ ...prod });
	}
};
seedProduct();
