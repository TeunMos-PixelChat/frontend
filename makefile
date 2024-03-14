REACT_APP_API_URL ?= http://localhost:3001

build-nogateway:
	docker build \
	--build-arg REACT_APP_API_URL=$(REACT_APP_API_URL) \
	-t pixelchat-frontend .

build_gateway:
	docker build \
	--build-arg REACT_APP_API_URL="api" \
	-t pixelchat-frontend .