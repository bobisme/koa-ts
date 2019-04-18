export PATH := node_modules/.bin:$(PATH)

.PHONY: phony

watch-server: phony
	nodemon --watch 'src/**/*' -e ts,tsx --exec ts-node ./src/server.ts
