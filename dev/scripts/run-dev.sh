#!/bin/bash

cd ./docker
docker-compose -f docker-compose-run-dev.yml up --remove-orphans
