#!/bin/bash

# Example usage: ./json_to_env.sh yourfile.json

# Check if the file is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <json-file>"
  exit 1
fi

# Read the JSON file and convert each key to an environment variable
while IFS="=" read -r key value; do
  export "$key"="$value"
  echo "Exported: $key=$value"
done < <(jq -r 'to_entries | .[] | "\(.key)=\(.value)"' "$1")
