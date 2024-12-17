BuildWise is a web platform that connects companies, clients, and admins. The platform allows clients to search for companies, view their profiles, and leave reviews for projects. Admins manage approvals for company listings and client reviews.

Table of Contents

Overview
Features
Technologies Used
Installation
Database Configuration
Seeding the Database
Running the Project
Folder Structure
License
Overview

The BuildWise platform allows:

Clients to search companies, view their projects, and leave reviews.
Companies to create profiles and showcase their project portfolios.
Admins to approve company profiles and client reviews.
The platform is built with modern tools such as Next.js, React, and Prisma ORM for smooth performance and scalability.

Features

User Authentication:
Login and signup forms for clients and companies.
Predefined admin accounts for administrative tasks.
Company Profiles:
Companies can create profiles showcasing their services and projects.
Admin approval required for public listing.
Client Reviews:
Clients can leave reviews for projects.
Admin approval required for public display.
Search Functionality:
Visitors can search company profiles and view details without logging in.
Informational Pages:
About Us and Partners pages for additional information and ads.
Technologies Used

Frontend: Next.js, React, JavaScript, Bootstrap
Backend: Node.js with API routes
Database: MySQL
ORM: Prisma ORM
Styling: CSS and Bootstrap
Installation

Follow these steps to set up the project locally:

Prerequisites
Node.js (v16+)
MySQL server installed
Git
Steps
Clone the repository:
git clone https://github.com/your-username/BuildWise.git
cd BuildWise
Install dependencies:
npm install
Set up environment variables: Create a .env file and configure your MySQL connection:
DATABASE_URL="mysql://user:password@localhost:3306/BuildWiseDB"
Database Configuration

Pull the Database Schema:
npx prisma db pull
Generate Prisma Client:
npx prisma generate
Seeding the Database: Run the seed script to populate the initial data:
npx prisma db seed
Running the Project

Start the development server:

npm run dev
The project will be available at http://localhost:3000.

Folder Structure

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
License

This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Feel free to fork this repository, submit issues, or create pull requests for enhancements. Contributions are welcome!

Replace the GitHub URL with your repository link, and let me know if you'd like me to add more details or specific instructions.
