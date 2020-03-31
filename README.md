"# chainYard"

Project Setup:

> npm install
> npm start

UX Flow

> Landing page displays latest block details and on load of these details current date blocks are displayed in pagination table. Each row in this table is clickable and navigates to particular block details.

> Block Details Page will display details of the particular block with the list of transactions on the block in a pagination table. Each row in the pagination table is clickable and navigates to particular transaction details page.

> Transaction details page display the transaction details.

UI Architecture

> Basic app is created using npx create-react-app
> Package.json file contains dependent node modules as well as the npm run commands
> src contains complete working code of the application.
> components folder contains React componets for each page of the application. I use react Hooks instead of react class based components.
> For handling application state I used redux, code related to it is in redux folder, did not add any action separately but handled directly in the component, reducer and sage folders since it is a small application.
> All Ascynchronous API call are handled in saga folder of redux.
> configureStore.js contains store configuration and sage middleware configuration.
> App.js file contains routing for the aapplication
> index.js react comoponent is mounted to the dom.

Unit Testing:
I did not get time to work on it, but have experience in it.

note: did not use webpack to build application as this is not compelex architeture,but I have experince in it.
