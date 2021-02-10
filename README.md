# Push CED source files to ephemeral

Github Action to push source files to ephemeral environment in CloudEdgeDistribution.

## Inputs

### `cli-token`

CloudEdgeDistribution CLI token. If not specified it'll try to resolve the CLI token from environment variable `CED_CLI_TOKEN`.

### `source-environment`

Environment to use as reference for ephemeral environment. If not specified it'll try to resolve it from environment variable CED_SOURCE_ENVIRONMENT.

### `ephemeral-environment`

Ephemeral environment. If not specified it'll try to resolve it from environment variable CED_EPHEMERAL_ENVIRONMENT.

### `path`

Path to the CloudEdgeDistribution project. If not specified it'll try to resolve it from environment variable `CED_PROJECT_PATH`, it'll use current folder otherwise.

## Example usage

```yaml
- uses: MerthinTechnologies/push-ced-source-to-ephemeral-action@v1
  with:
    path: ${{ env.PROJECT_PATH }}
    cli-token: ${{ secrets.CED_CLI_TOKEN }}
    source-environment: 'development'
    ephemeral-environment: 'ephemeral1'
```
