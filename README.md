# Chipotle Rewards Manager

A Next.js application for managing and tracking Chipotle rewards and promotional offers. This web app allows users to:

- View their Chipotle rewards
- Track expiration dates
- Manage reward usage status
- View reward details and terms

## Features

- Modern, responsive UI built with Tailwind CSS
- Dark mode support
- Client-side reward management
- Support for multiple reward types (BOGO, Free Entrée, etc.)
- Expiration tracking and notifications

## Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm package manager

## Getting Started

1. Clone the repository:

2. Install dependencies:

- npm install

3. Run the development server:

4. Open [http://localhost:3000](http://localhost:3000) with your browser to launch.

5. Retrieve your rewards.json by logging in on your browser to Chipotle. Have Charles or similar network monitor running to find the request made to https://services.chipotle.com/promo/v2/customers/promotions?countryCode=US. Response will include all the promotions/offers you've added online. (Sample JSON file located in the data folder of this repo)

6. Upload the .json file to the application to view and manage your rewards.

