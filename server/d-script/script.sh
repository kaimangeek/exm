#!/bin/sh
docker stop exam_project_volume
docker volume remove exam_project_volume
docker volume create exam_project_volume
docker run -d --name exam-project -v exam_project_volume:/data/db  -p 5432:5432 -e POSTGRES_PASSWORD=qwerty postgres