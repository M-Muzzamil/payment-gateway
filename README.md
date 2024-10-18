# Payment Gateway

This project is a payment gateway application. It allows you to handle payments using various APIs. Follow the instructions below to run the project.

## Table of Contents
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Health Check](#health-check)
- [Payment Form](#payment-form)
- [API Usage](#api-usage)
- [License](#license)

## Installation

### Prerequisites
- Make sure you have [Docker](https://docs.docker.com/get-docker/) installed if you plan to run the project using Docker.
- Alternatively, ensure you have [Node.js](https://nodejs.org/en/) installed.

## Running the Project

### 1. Using Docker

To run the project with Docker, execute the following commands:

```bash
sudo docker build -t payment-gateway .
sudo docker run --env-file .env -p 3001:3001 payment-gateway
```

### 2. Using Node.js

If you prefer to run the project using Node.js, follow these steps:

#### Install Node.js version 18.13 using NVM

To install Node.js using NVM (Node Version Manager), follow these steps:

```bash
# Install NVM if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Restart your terminal or run the following command to load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Install Node.js version 18.13
nvm install 18.13
nvm use 18.13
```

#### Install dependencies and run the application
```bash
npm install
npm run start
```

## Health Check

Once the project is up and running, you can access the health endpoint:

- **Health Endpoint:** [http://localhost:3001/check/health](http://localhost:3001/check/health)

## Payment Form

You can also view the front-end form at:

- [http://localhost:3001/payment/form](http://localhost:3001/payment/form)


## API Usage

You can test the API using Postman or cURL. Below is the cURL command for testing the payment endpoint:

```bash
curl --location --request POST 'http://localhost:3001/payment' \
--header 'Content-Type: application/json' \
--data-raw '{
  "amount": "150",
  "currency": "USD",
  "customerName": "muzzamil",
  "cardHolderName": "Muh muz",
  "cardNumber": "5555555555554444",
  "expirationMonth": "12",
  "expirationYear": "2024",
  "cvv": "123"
}'
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Instructions to Add to GitHub

1. **Create the `README.md` file** in your project directory if it doesn’t exist.
2. **Copy the entire content above** and paste it into the `README.md` file.
3. **Save the file.**
4. **Commit and Push** the changes to your GitHub repository:

   ```bash
   git add README.md
   git commit -m "Add README.md"
   git push origin master
```
