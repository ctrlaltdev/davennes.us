SHELL := /bin/bash

fmt-check:
	cd infra/modules && terraform fmt -recursive -check
	cd infra/config && terragrunt hclfmt --terragrunt-check

fmt:
	cd infra/modules && terraform fmt -recursive
	cd infra/config && terragrunt hclfmt

install-terra-env:
	@chmod 755 scripts/install_terra_env
	./scripts/install_terra_env

set-terra-versions:
	@chmod 755 ~/.tfenv/bin/terraform
	@chmod 755 ~/.tgenv/bin/terragrunt
	@tfenv install
	@tgenv install
	@tfenv use $(shell cat .terraform-version)
	@tgenv use $(shell cat .terragrunt-version)

tf-clean:
	rm -rf infra/config/**/.terragrunt-cache

clean:
	rm -rf node_modules

npm-install: clean
	npm i --prod

build-site: npm-install
	npm run build

upload: build-site
	aws s3 sync ./public s3://0x766f6964-aurelien-davennes.us/ --delete
