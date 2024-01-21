#!/bin/bash

export $(xargs < .env)

set -e

# Build Docker Image
echo "Building Docker Image..."
sudo docker-compose build

#Tag Docker Image
echo "Tagging Docker Image..."
sudo docker tag $PROJECT_NAME $PROJECT_REGION-docker.pkg.dev/$PROJECT_ID/$PROJECT_REPO/$PROJECT_NAME

#Push Docker Image to Google Container Registry
echo "Pushing Docker Image to Google Container Registry..."
docker push $PROJECT_REGION-docker.pkg.dev/$PROJECT_ID/$PROJECT_REPO/$PROJECT_NAME

#Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy $PROJECT_NAME \
    --image=$PROJECT_REGION-docker.pkg.dev/$PROJECT_ID/$PROJECT_REPO/$PROJECT_NAME \
    --platform=managed \
    --region=$PROJECT_REGION \
    --project=$PROJECT_ID
