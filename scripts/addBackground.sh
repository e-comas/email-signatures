#!/bin/sh

convert "$1" -background transparent -gravity center -extent $(identify -format '%[fx:max(w,h)]' "$1")x$(identify -format '%[fx:max(w,h)]' "$1") "$2"
