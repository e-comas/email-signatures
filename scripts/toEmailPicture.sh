#!/bin/sh

# Converts High definition transparent png headshot into an optimized jpg for email signatures
# Usage: `./toEmailPicture.sh input.png output.jpg`

realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

full_path=
dir_path=$(dirname "$(realpath "$0")")

input=$(realpath "$1")
output=$(realpath "$2")

file "$input"

(cd "$dir_path" && ./addBackground.sh "$input" "$output.intermediary")
file "$output.intermediary"
NODE_OPTIONS=--no-experimental-fetch "$dir_path/optimizeImageSize.mjs" "$output.intermediary" "$output" \
&& rm "$output.intermediary"

if [ $? -eq 0 ]; then
    echo "\033[0;32mDONE:\033[0m Optimized image sucessfuly written to $output"
else
    echo "\033[0;31mERROR:\033[0m Image optimization failed"
fi
