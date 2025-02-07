<div align="center">

# NestJS GraphQL Postgres Server

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> A modern e-commerce backend server built with NestJS, GraphQL, and PostgreSQL database. This project provides a robust foundation for building scalable online stores with advanced product search capabilities and order management.

</div>

## ✨ Features

- **GraphQL API** with resolvers for:
  - 📦 Products
  - 🗂️ Collections
  - 📑 Categories
  - 🛍️ Orders
  - ⭐ Reviews
- **PostgreSQL Database** integration
- **Docker** support for easy deployment
- **TypeScript** for type safety

## 🚀 Roadmap

Planned features and improvements:
- 🔍 Advanced product search using Qdrant vector database
- 🎯 AI-powered product recommendations
- 🤖 Semantic search capabilities
- 📊 Enhanced analytics and reporting

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| [NestJS](https://nestjs.com/) | Progressive Node.js framework |
| [GraphQL](https://graphql.org/) | Query language for APIs |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [TypeScript](https://www.typescriptlang.org/) | Programming language |
| [Docker](https://www.docker.com/) | Containerization |

## 🔧 Installation

### Using Docker

1. Clone the repository:

```bash
git clone https://github.com/IrePro78/NestJS_GraphQL_Qdrant_Postgres_Server.git
```

2. Copy environment file:

```bash
cp env-example .env
```

3. Run with Docker Compose:

```bash
docker-compose up -d
```

### Manual Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp env-example .env
```

3. Start the development server:

```bash
npm run start:dev
```

## 📝 API Documentation

After starting the server, you can access the GraphQL playground at:

```
http://localhost:3000/graphql
```

### Example Queries

<div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px;">

```graphql
# Get all products
query {
	products {
		id
		name
		description
	}
}

# Get specific category
query {
	category(id: "category-id") {
		id
		name
		products {
			id
			name
		}
	}
}

# Create new product
mutation {
	createProduct(
		input: {
			name: "New Product"
			description: "Product description"
			price: 99.99
			categoryId: "category-id"
		}
	) {
		id
		name
		price
	}
}

# Create new order
mutation {
	createOrder(
		input: {
			items: [{ productId: "product-id", quantity: 2 }]
			customerEmail: "customer@example.com"
		}
	) {
		id
		totalAmount
		status
		items {
			product {
				name
			}
			quantity
		}
	}
}

# Add review
mutation {
	createReview(
		input: {
			productId: "product-id"
			rating: 5
			comment: "Great product!"
		}
	) {
		id
		rating
		comment
		createdAt
	}
}
```

</div>

## 🐳 Docker Configuration

<div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px;">

The project includes Docker support with:

- PostgreSQL container
- Qdrant container
- NestJS application container

Use `docker-compose.yml` to manage the containers.

</div>

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

Ireneusz Prokopski - [GitHub Profile](https://github.com/IrePro78)

Project Link: [https://github.com/IrePro78/NestJS_GraphQL_Qdrant_Postgres_Server](https://github.com/IrePro78/NestJS_GraphQL_Qdrant_Postgres_Server)

</div>
