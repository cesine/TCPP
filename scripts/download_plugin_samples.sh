#!/bin/bash
CURRENT=`pwd`

cd ../
git clone https://github.com/Icenium/sample-deviceinfo.git
git clone https://github.com/Icenium/sample-file.git
git clone https://github.com/Icenium/sample-geolocation.git
git clone https://github.com/Icenium/sample-in-app-browser.git
git clone https://github.com/Icenium/sample-media-player.git
git clone https://github.com/Icenium/sample-capture.git


cd $CURRENT
mkdir www/samples
cp -R ../sample-deviceinfo www/samples/
cp -R ../sample-file www/samples/
cp -R ../sample-geolocation www/samples/
cp -R ../sample-in-app-browser www/samples/
cp -R ../sample-media-player www/samples/
cp -R ../sample-capture www/samples/