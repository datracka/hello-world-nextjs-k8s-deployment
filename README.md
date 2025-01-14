# Project

## Configuration

## Local deployment using K8S

### Dependencies

- You need `minikube` or similar and `kubernetes-cli`
- Build an image: `docker build --pull --rm -f "Dockerfile" -t helloworldnextjsk8sdeployment:<semver> "."`
- Add the image to the minikube's internal container runtime environment

```bash
    minikube image load helloworldnextjsk8sdeployment:<semver>
```

- Modify the `deployment-local.yml` file and add the image

```bash
 containers:
      - name: nextjs-app-container
        image: helloworldnextjsk8sdeployment:<semver>  # Update with your local image
```

- Create the deployment

```bash
    kubectl apply -f deployment-local.yml
    
- Expose the deployment

```bash
kubectl expose deployment nextjs-app-deployment --type=NodePort --port=3000

## you have to run it each time yo create a new deployment, it returns a differnt port
minikube service nextjs-app-deployment --url
```

### Useful commands

```bash
# Check running containers in MK (low level)
minikube ssh -- docker ps   
# get existing deployments
kubectl get services
# delete service & deployment
kubectl delete service <service_name>
kubectl delete deployment <deployment name>
# list images in minikube
minikube image list
# remove image from minikube registre
minikube image rm helloworldnextjsk8sdeployment:<semver>

# look into a container
docker exec -it <docker image> sh

## locally run the image
 docker run -d \
  -p 3000:3000  -e NODE_ENV=development  -e DATABASE_HOST=host.docker.internal  -e DATABASE_PORT=5432 -e DATABASE_USER=vicensfayos -e DATABASE_PASSWORD= -e DATABASE_NAME=experthero  helloworldnextjsk8sdeployment:11.0.0
```

## CI / CD configuration

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
