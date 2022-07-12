#!/bin/bash

# Get the app name from package.json
appName=`node -pe "require('./package.json').name"`

echo "Starting new release for $appName"

# Get the new version
version=`node -pe "require('./package.json').version"`

# Create release branch
git checkout -b release/$version

# Switch to master branch
git checkout master

# Merge the release branch into master
GIT_MERGE_AUTOEDIT=no git merge --no-ff release/$version

git push

# Switch to develop branch
git checkout develop
git pull

# Merge the release branch into develop
GIT_MERGE_AUTOEDIT=no git merge --no-ff release/$version

# Push to develop branch
git push

# Delete the release branch
git branch -d release/$version

echo "Release successful"