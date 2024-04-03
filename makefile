REACT_APP_API_URL ?= http://localhost:3001
REACT_APP_AUTH0_DOMAIN ?= dev-1qp5piklx43am651.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID ?= ivx5pJfcdk2R0ZfIM7rl8MCRNIQ8Q0RO


build:
	docker build \
	--build-arg REACT_APP_API_URL="api" \
	--build-arg REACT_APP_TEST=2380d \
	--build-arg REACT_APP_AUTH0_DOMAIN=$(REACT_APP_AUTH0_DOMAIN) \
	--build-arg REACT_APP_AUTH0_CLIENT_ID=$(REACT_APP_AUTH0_CLIENT_ID) \
	-t pixelchat-frontend .

build_gateway:
	docker build \
	--build-arg REACT_APP_API_URL="api" \
	-t pixelchat-frontend .