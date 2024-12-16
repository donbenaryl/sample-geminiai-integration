# Case Comparison API

A REST API service that compares cases using Google's Gemini AI and provides chat functionality for further analysis.

This is just a quick development to try out Gemini AI while also helping my brother in law with his project.

## Features

- Create and manage cases
- Compare two cases using Gemini AI
- Chat functionality to discuss comparisons and cases
- Swagger documentation
- MySQL database with Prisma ORM
- TypeScript implementation

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- Google Cloud Platform account with Gemini API access

## Installation

1. Clone the repository: 
```bash
git clone https://github.com/your-username/case-comparison-api.git
cd case-comparison-api
```
3. Set up environment variables:
```bash
cp .env.example .env
```
Update the `.env` file with your credentials:
DATABASE_URL="mysql://user:password@localhost:3306/case_comparison"<br>
GEMINI_API_KEY="your-gemini-api-key"<br>
PORT=3000

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run start
```

## API Documentation

Access the Swagger documentation at:


### Main Endpoints

- `POST /api/cases` - Create a new case
- `GET /api/cases` - Get all cases
- `GET /api/cases/:id` - Get a specific case
- `POST /api/comparisons` - Compare two cases
- `GET /api/comparisons/:id` - Get a comparison
- `POST /api/chats` - Create a chat message

## Project Structure
```
project/
├── src/
│   ├── controllers/   # Request handlers
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── types/         # TypeScript types
│   └── index.ts       # Application entry point
├── prisma/
│   └── schema.prisma  # Database schema
└── tests/             # Test files
```


## Technologies Used

- Node.js & Express.js
- TypeScript
- MySQL
- Prisma ORM
- Google Gemini AI
- Swagger/OpenAPI
- Zod (validation)

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
