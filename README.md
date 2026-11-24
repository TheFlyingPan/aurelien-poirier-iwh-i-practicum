# Welcome to the Integrating With HubSpot I: Foundations Practicum

**Custom object list view:**

https://app.hubspot.com/contacts/<test-account-id>/objects/<custom-object-id>/views/all/list

Replace this link with the list view from your developer test account.

## Run

1. `npm install`
2. Copy `.env.example` to `.env`
3. Set `PRIVATE_APP_ACCESS` to your private app token
4. Set `CUSTOM_OBJECT` to the custom object type id (for example `2-12345678`)
5. `node index.js`
6. Open http://localhost:3000

The custom object is **Plants**, with properties `name`, `species`, and `bio`. Do not commit `.env`.
