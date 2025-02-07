# API Documentation

## GraphQL API Reference

This document provides detailed information about the available GraphQL operations in our e-commerce API.

### 🔍 Queries

#### Get Products

Retrieve a list of all products.

```graphql
query GetProducts {
	products {
		id
		name
		description
		price
		# Optional fields
		category {
			id
			name
		}
		reviews {
			rating
			comment
		}
	}
}
```

#### Get Category with Products

Fetch a specific category and its products.

```graphql
query GetCategory($categoryId: ID!) {
	category(id: $categoryId) {
		id
		name
		products {
			id
			name
			price
			description
		}
	}
}
```

### ✏️ Mutations

#### Create Product

Add a new product to the catalog.

```graphql
mutation CreateProduct($input: CreateProductInput!) {
	createProduct(input: $input) {
		id
		name
		price
	}
}
```

Input format:

```json
{
	"input": {
		"name": "New Product",
		"description": "Product description",
		"price": 99.99,
		"categoryId": "category-id"
	}
}
```

#### Create Order

Place a new order.

```graphql
mutation CreateOrder($input: CreateOrderInput!) {
	createOrder(input: $input) {
		id
		totalAmount
		status
		items {
			product {
				name
				price
			}
			quantity
		}
	}
}
```

Input format:

```json
{
	"input": {
		"items": [
			{
				"productId": "product-id",
				"quantity": 2
			}
		],
		"customerEmail": "customer@example.com"
	}
}
```

#### Add Product Review

Submit a review for a product.

```graphql
mutation AddReview($input: CreateReviewInput!) {
	createReview(input: $input) {
		id
		rating
		comment
		createdAt
	}
}
```

Input format:

```json
{
	"input": {
		"productId": "product-id",
		"rating": 5,
		"comment": "Great product!"
	}
}
```

### 📝 Types

#### Product

```graphql
type Product {
	id: ID!
	name: String!
	description: String
	price: Float!
	category: Category
	reviews: [Review!]
}
```

#### Category

```graphql
type Category {
	id: ID!
	name: String!
	products: [Product!]!
}
```

#### Order

```graphql
type Order {
	id: ID!
	items: [OrderItem!]!
	totalAmount: Float!
	status: OrderStatus!
	customerEmail: String!
	createdAt: DateTime!
}
```

#### Review

```graphql
type Review {
	id: ID!
	rating: Int!
	comment: String
	productId: ID!
	createdAt: DateTime!
}
```
