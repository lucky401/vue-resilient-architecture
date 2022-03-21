dev:
	docker build -t web-admin .
serve:
	docker run -d -p 8080:3000 --name web-admin web-admin
stop:
	docker stop web-admin && docker rm web-admin
logs:
	docker logs -f web-admin
