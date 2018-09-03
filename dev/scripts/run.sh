#!/bin/bash

cd ./docker
docker-compose -f docker-compose-run.yml up --remove-orphans
