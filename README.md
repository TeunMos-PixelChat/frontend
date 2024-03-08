# Frontend

This is the frontend of the PixelChat project. It is a React web application for the chat interface.

In the future it may be expanded to an Electron application for desktop use.

## Development

Node.js (version 20) is used for development. The frontend uses typescript and react.

To install the dependencies, run:

```bash
npm install
```

To start the development server, run:

```bash
npm start
```

This will start the development server at [http://localhost:3000](http://localhost:3000).


## Deployment

### Deployment to Azure

The frontend is deployed with [Azure static web apps](https://azure.microsoft.com/en-us/products/app-service/static). The deployment is done automatically when changes are pushed to the `main`, `develop` or pull requests are created.

> The github workflow file for deployment can be found [here!](.github/workflows/azure-static-web-apps-black-coast-05ede3c03.yml)

You can access the deployed frontend versions at these links:
- https://black-coast-05ede3c03.5.azurestaticapps.net/ - production (main branch)
- https://black-coast-05ede3c03-develop.westeurope.5.azurestaticapps.net/ - develop
### Local Deployment (Docker)

> In the future a docker compose file will be added to deploy the frontend and backend together.

The application uses docker for local deployment. To build the docker image, run:

```bash
docker build -t pixelchat-frontend .
```


## Testing

> **Caution: There are no tests for the frontend yet, so the command below will not run any tests.**

The frontend uses jest and react-testing-library for testing. To run the tests, run:

```bash
npm run test
```

## Important Libraries Used in the Frontend

- [Mantine](https://mantine.dev/) - UI library
- [Socket.io](https://socket.io/) - for real-time communication with the backend
- [Axios](https://axios-http.com/) - for making HTTP requests to the backend
- [React Router](https://reactrouter.com/) - for routing
- [Auth0](https://auth0.com/) - for authentication

