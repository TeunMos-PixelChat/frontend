REACT_APP__MESSAGE_API_URL ?= http://localhost:3001

build:
	docker build \
	--build-arg REACT_APP__MESSAGE_API_URL=$(REACT_APP__MESSAGE_API_URL) \
	-t pixelchat-frontend .

build_gateway:
	docker build \
	--build-arg REACT_APP__MESSAGE_API_URL="api" \
	-t pixelchat-frontend .