#!/bin/sh

moveFilesToSite () {
	cp -r css _site
	cp -r images _site
	cp -r js _site
	cp index.html _site
}

moveFilesToSite

#`git add --all`
#`git commit -m "deploy"`
#`git subtree push --prefix _site origin gh-pages`