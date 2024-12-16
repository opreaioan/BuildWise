# BuildWise

BuildWise is a platform designed to bridge the gap between clients and companies by showcasing verified company profiles, project portfolios, and client reviews. It offers robust role-based account management, approval workflows for reviews and profiles, and an intuitive search feature.

## Features

- **Role-Based Accounts**:
  - **Admin**: Approves company profiles and client reviews, manages the platform.
  - **Company**: Creates and updates profiles, adds project portfolios.
  - **Client**: Leaves reviews on company profiles.

- **Approval Workflows**:
  - Client reviews and company profiles require admin approval before being visible on the platform.

- **Company Search**:
  - Any visitor can search for and view company profiles, projects, and reviews.

- **Static Pages**:
  - **Home Page**: Features login and signup forms.
  - **About Us Page**: Describes the mission and vision of BuildWise.
  - **Partners Page**: Displays ads and collaborations with online stores.

## Technology Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/): React framework with server-side rendering and static site generation.
  - [Bootstrap](https://getbootstrap.com/): For responsive UI design.
  - CSS & JavaScript: Custom styling and interactivity.

- **Backend**:
  - Node.js: Server-side logic.
  - [Prisma](https://www.prisma.io/): ORM for database interaction.

- **Database**:
  - MySQL: Reliable and scalable relational database system.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/BuildWise.git
   cd BuildWise
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   - Ensure MySQL is installed and running.
   - Create a database named `BuildWiseDB`.
   - Update the `.env` file with your database credentials:
     ```env
     DATABASE_URL="mysql://root:yourpassword@localhost:3306/BuildWiseDB"
     ```

4. **Pull the Prisma Schema**:
   ```bash
   npx prisma db pull
   ```

5. **Seed the Database**:
   ```bash
   npx prisma db seed
   ```

6. **Run the Development Server**:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Admins**:
   - Approve or reject company profiles and client reviews.

2. **Companies**:
   - Sign up, create profiles, and add project portfolios.

3. **Clients**:
   - Sign up, search for companies, and leave reviews.

## Contributions
    - NA

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/).
- Database powered by [MySQL](https://www.mysql.com/).
- ORM by [Prisma](https://www.prisma.io/).

