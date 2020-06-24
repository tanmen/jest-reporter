# Jest Reporter
Creates annotations based on the output of json (see [how to configure `jest` properly](./README.md#jest-configuration)).

## Example

<kbd>.github/workflows/your-workflow.yml</kbd>
```
    - run: jest --json --outputFile=result.json --testLocationInResults
    - uses: tanmen/jest-reporter@v1
      if: always()
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
``` 

## Inputs
### `github-token` - **required**
We'll need that to enrich the actions run with annotations.
The secret is automatically generate by github.com.

### `result-file` - *optional*
The location of the json file.

#### default value
```shell script
./result.json
```

## `jest` Configuration
```shell script
jest --json --outputFile=result.json --testLocationInResults
```
