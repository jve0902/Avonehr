# Clinios

## Stack

- React.js
- Redux
- Material-UI
- Node + Express
- MySQL

## Database

1. Install MySQL
2. Load file mysql_start.txt

To query the database we recommend MySQL Workbench https://www.mysql.com/products/workbench/

## Client

Setup:

1. `cd client`
2. `yarn install`
3. copy `.env.sample` into `.env` and fill in credentials

To run:

1. `yarn start` or `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)

## API

Setup:

1. `cd server`
2. `yarn install`
3. copy `.env.sample` into `.env` and fill in credentials
4. Make sure your database is running on your machine

To run:

1. `yarn dev` or `npm run dev` for development, `yarn start` for production
2. API end point would be `http://localhost:5001`
3. If you get an error "Client does not support authentication protocol requested by server" then
    `alter user 'root'@'localhost' identified with mysql_native_password by '12345678'`

## Prettier

1. In Visual Studio Code install the Prettier extension.
2. Go to Code -> Settings -> Preferences, search for `editor.formatOnSave`, set to True.

## App

1. Login page for clients/doctors http://localhost:3000/login_client
2. Use email test@test.com password 12345678
3. Use these credentials so you will see the demo data for this client.

## Email

To test email notifications (only for development):

1. Get `username` and `password` from `https://ethereal.email/create`
2. Check emails on `https://ethereal.email/messages`
