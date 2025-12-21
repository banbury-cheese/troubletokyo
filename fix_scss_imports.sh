#!/bin/bash

# Function to calculate relative path from file to styles directory
get_relative_path() {
    local file="$1"
    local dir=$(dirname "$file")
    local depth=$(echo "$dir" | tr -cd '/' | wc -c)
    local prefix=""
    
    for ((i=0; i<depth; i++)); do
        prefix="../$prefix"
    done
    
    echo "${prefix}styles/breakpoints.scss"
}

# Find all .scss files (excluding node_modules and styles/breakpoints.scss itself)
find . -name "*.scss" ! -path "*/node_modules/*" ! -path "./styles/breakpoints.scss" -type f | while read file; do
    # Check if file contains @import "styles/breakpoints.scss"
    if grep -q '@import "styles/breakpoints.scss"' "$file"; then
        echo "Fixing: $file"
        relative_path=$(get_relative_path "$file")
        # Replace @import with @use and correct path
        sed -i '' "s|@import \"styles/breakpoints.scss\";|@use \"$relative_path\" as *;|g" "$file"
    fi
done

echo "Done!"
