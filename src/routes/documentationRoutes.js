const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const apiDocumentation = YAML.load('./docs/api.yaml');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(apiDocumentation));

module.exports = router;
