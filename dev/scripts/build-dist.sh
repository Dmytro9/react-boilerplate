#!/bin/bash

cd ./docker
docker-compose -f docker-compose-build-dist.yml up --build --remove-orphans
cd ../
