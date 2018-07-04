#!/bin/bash

cd ./docker
docker-compose -f docker-compose-build-dev.yml up --build --remove-orphans
cd ../
