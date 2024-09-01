const fs = require('fs-extra');

// Copy the YAML file from src/resources to public/resources
fs.copySync('./src/resources/alar.yml', './public/resources/alar.yml');