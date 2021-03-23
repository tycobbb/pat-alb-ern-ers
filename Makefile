include ./Makefile.base.mk

# -- cosmetics --
help-column-width = 5

# -- context --
tools-python = python3

# -- init --
## setup the dev environment
init: i/pre
.PHONY: init

i/pre:
ifeq ("$(shell command -v python3)", "")
	$(info ✘ python3 is not installed:)
	$(info - brew install python@3.9)
	$(error 1)
endif
.PHONY: i/pre

# -- start --
## start the dev server
start: s
.PHONY: start

s:
	$(tools-python) -m http.server
.PHONY: s
