docker run \
  --name mongodb \
  -p 27017:27017 \
  -d \
  mongo:4

docker ps # listar os containers ativos
docker stop # parar containers ativos

docker exec -it mongodb mongo

# app
docker build -t app .

docker run \
  --name app \
  --link mongodb \
  -e MONGO_URL=mongodb \
  -e PORT=4000 \
  -p 4000:4000 \
  app

docker volume create --name nodemodules

docker run \
  --name app \
  --link mongodb \
  -e MONGO_URL=mongodb \
  -e PORT=4000 \
  -p 4000:4000 \
  -v `pwd`:/src \
  -v nodemodules:/src/node_modules \
  app npm run dev:watch

docker rm app
docker volume rm nodemodules

docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

docker compose up # docker-compose up --build
docker compose down # docker-compose down