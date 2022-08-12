# Avaldao Feathers

Servicios de Avaldao para el almacenamiento de avales off-chain.

## Despliegue

Para levantar Avaldap Feathers debe iniciarse un contenedor Docker con la imagen `acdi/efem-users-feathers` de la siguiente manaera:

```
$ docker run --name avaldao-feathers -v /etc/avaldao/feathers/default.json:/usr/src/app/config/default.json:rw -v /etc/avaldao/feathers/.env:/usr/src/app/.env:rw -p 7030:3030/tcp --net avaldao_default --restart always --expose 3030/tcp -e 'NODE_VERSION=10.21.0' -e 'YARN_VERSION=1.22.4' -d acdi/avaldao-feathers:latest
```

### Update

Para actualizar el contenedor con una nueva image debe ejecutarse lo siguiente, donde `CONTAINER_ID` es el identificador del contenedor de Avaldao Feathers.

```
$ docker container stop CONTAINER_ID
$ docker container rm CONTAINER_ID
$ docker pull acdi/avaldao-feathers
$ docker run --name avaldao-feathers -v /etc/avaldao/feathers/default.json:/usr/src/app/config/default.json:rw -v /etc/avaldao/feathers/.env:/usr/src/app/.env:rw -p 7030:3030/tcp --net avaldao_default --restart always --expose 3030/tcp -e 'NODE_VERSION=10.21.0' -e 'YARN_VERSION=1.22.4' -d acdi/avaldao-feathers:latest
```