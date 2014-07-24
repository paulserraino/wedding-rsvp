#!/bin/sh

moveFilesToSite () {
	cp -r css _site
	cp -r images _site
	cp -r js _site
	cp index.html _site
}

deployToGHPages () {
	`git add --all`
	`git commit -m "deploy"`
	`git subtree push --prefix _site origin gh-pages`
}

moveFilesToSite
deployToGHPages
