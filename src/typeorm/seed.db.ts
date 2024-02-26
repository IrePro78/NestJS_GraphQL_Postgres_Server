import { Product } from '../graphql/models/product.model';
import { mockProduct } from '../_mocks_/products.mocks';

export const seedProduct = async () => {
	// await Product.save({
	// 	name: 'Product 1',
	// 	description: 'This is product 1',
	// 	price: 100,
	// 	product_image: 'http://example.com/product1.jpg',
	// });
	for (const prod of mockProduct) {
		const productId = await Product.createQueryBuilder()
			.insert()
			.into(Product)
			.values(prod)
			.execute()
			.then((res) => res.raw[0].id);
		await Product.createQueryBuilder()
			.relation(Product, 'categories')
			.of(productId)
			.add('fa1d3061-1650-4ec6-875f-bc643964a005')
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
