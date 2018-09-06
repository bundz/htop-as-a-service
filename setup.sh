#!/bin/bash

DEPENDENCIES=(virt-top sysstat python-software-properties python g++ make)
NODEPATH=$(which node)
NPMPATH=$(which npm)

apt -qq install -y $DEPENDENCIES


if [ -z $NODEPATH ]
then
  ( mkdir -p /opt/node; cd /opt/node; curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1 && ./configure && make install )
  NODEPATH=/opt/node/bin/node
fi

if [ -z $NPMPATH ]
then
  ( curl https://www.npmjs.org/install.sh | sh )
  NPMPATH=/usr/sbin/npm
fi

$NPMPATH install
