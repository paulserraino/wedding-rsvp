#!/bin/sh

moveFilesToSite () {
	cp -r css _site
	cp -r images _site
	cp -r js _site
	cp -r thankyou _site
	cp -r guestlist _site
	cp index.html _site
}

deployToGHPages () {
	`git add --all`
	`git commit -m "deploy"`
	`git subtree push --prefix _site origin gh-pages`

	#if this breaks, then try
	# git reset --hard gh-pages/head
	# git push --force origin gh-pages
}


moveFilesToSite
deployToGHPages
