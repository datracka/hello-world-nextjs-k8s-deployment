# Project

## Configuration


## CI / CD 

Define the following variables in your github secrets

```bash
# For DB connection 

DATABASE_HOST
DATABASE_NAME
DATABASE_PASSWORD
DATABASE_PORT
DATABASE_USER

# Docker images repository token
# You can retrieve it from the hub.docker.com account 
DOCKER_HUB_ACCESS_TOKEN

# K8s API configuration (in base 64)
# Ask for it to your infrastructure peer
KUBECONFIG_CONTENT
```
