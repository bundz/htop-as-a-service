#!/bin/bash

DEPENDENCIES=(virt-top sysstat python-software-properties python g++ make)

apt -qq install -y $DEPENDENCIES

( curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1 && ./configure && make install ) # ok, fine, this step probably takes more than 30 seconds...
( curl https://www.npmjs.org/install.sh | sh )

npm install
