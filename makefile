REACT_APP__MESSAGE_API_URL ?= http://localhost:3001

docker:
	docker build \
	--build-arg REACT_APP__MESSAGE_API_URL=$(REACT_APP__MESSAGE_API_URL) \
	-t pixelchat-frontend .