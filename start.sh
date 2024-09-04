#!/bin/sh

if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Running migrations..."
    node ace migration:run --force
else
    echo "Skipping migrations. Set RUN_MIGRATIONS=true to run them."
fi

npm start
