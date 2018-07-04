#!/bin/bash

cd ./docker
docker-compose -f docker-compose-run-dist.yml up --remove-orphans
