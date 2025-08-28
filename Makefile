NODE_ENV ?= dev

default: local

run:
	npm run local

lint:
	npx eslint src/*.js* src/components/*.js* src/components/**/*.js* --fix

build:
	rm -rf dist/
	rm -rf package-lock.json
	npm install
	npm run build-env

deploy:
	aws s3 sync dist/ s3://register.${NODE_ENV}.neithing.com
	DISTRIBUTION_ID="$(shell aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items!=null] | [?contains(Aliases.Items, 'register."${NODE_ENV}".neithing.com')].Id" --output text)" make invalidate
	
invalidate:
	INVALIDATION_ID="$(shell aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*" --query "Invalidation.Id" --output text)" make wait-deployment

wait-deployment:
	aws cloudfront wait invalidation-completed --distribution-id ${DISTRIBUTION_ID} --id ${INVALIDATION_ID}

clean:
	rm -rf node_modules
	npm install
	$(MAKE) lint

setup:
	npm install --save-dev webpack webpack-cli webpack-dev-server \
													file-loader \
													mini-css-extract-plugin \
													@babel/preset-env @babel/preset-react \
													@babel/core \
													babel-loader \
													@babel/eslint-parser \
													html-webpack-plugin \
													copy-webpack-plugin
	npm install