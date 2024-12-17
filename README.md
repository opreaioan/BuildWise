# BuildWise

BuildWise is a web platform that connects companies, clients, and admins. The platform allows clients to search for companies, view their profiles, and leave reviews for projects. Admins manage approvals for company listings and client reviews.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Configuration](#database-configuration)
- [Seeding the Database](#seeding-the-database)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Overview

The BuildWise platform allows:
- **Clients** to search companies, view their projects, and leave reviews.
- **Companies** to create profiles and showcase their project portfolios.
- **Admins** to approve company profiles and client reviews.

The platform is built with modern tools such as **Next.js**, **React**, and **Prisma ORM** for smooth performance and scalability.

---

## Features

1. **User Authentication**:
   - Login and signup forms for clients and companies.
   - Predefined admin accounts for administrative tasks.

2. **Company Profiles**:
   - Companies can create profiles showcasing their services and projects.
   - Admin approval required for public listing.

3. **Client Reviews**:
   - Clients can leave reviews for projects.
   - Admin approval required for public display.

4. **Search Functionality**:
   - Visitors can search company profiles and view details without logging in.

5. **Informational Pages**:
   - About Us and Partners pages for additional information and ads.

---

## Technologies Used

- **Frontend**: Next.js, React, JavaScript, Bootstrap
- **Backend**: Node.js with API routes
- **Database**: MySQL
- **ORM**: Prisma ORM
- **Styling**: CSS and Bootstrap

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v16+)
- MySQL server installed
- Git

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/BuildWise.git
   cd BuildWise
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and configure your MySQL connection:
   ```env
   DATABASE_URL="mysql://user:password@localhost:port/database_name"
   Replace user, password, port and database_name with your own credentials. 
   ```

---

## Database Configuration

1. **Pull the Database Schema**:
   ```bash
   npx prisma db pull
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Seeding the Database**:
   Run the seed script to populate the initial data:
   ```bash
   npx prisma db seed
   ```

---

## Running the Project

Start the development server:
```bash
npm run dev
```

The project will be available at `http://localhost:3000`.

---

## Folder Structure

```
/buildwise
│── prisma/          # Prisma schema and seed script
│── public/          # Static assets
│── src/
│   │── components/  # Reusable components
│   │── pages/       # Next.js pages (Home, About, Partners, etc.)
│   │── styles/      # CSS and Bootstrap styles
│── .env             # Environment variables
│── package.json     # Dependencies and scripts
└── README.md        # Project documentation
```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

### Contributing

Feel free to fork this repository, submit issues, or create pull requests for enhancements. Contributions are welcome!
