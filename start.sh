#!/bin/sh

if [ -f ".env.$DEPLOY_ENV" ]; then
    export $(grep -v '^#' .env.$DEPLOY_ENV | xargs)
fi

envsubst < .env.$DEPLOY_ENV > .env

if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Running migrations..."
    node ace migration:run --force
else
    echo "Skipping migrations. Set RUN_MIGRATIONS=true to run them."
fi

npm start
