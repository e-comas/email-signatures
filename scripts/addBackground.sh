#!/bin/sh

convert -background none background_shape.png "$1" -layers flatten "$2"
