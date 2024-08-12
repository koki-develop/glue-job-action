# glue-job-action

[![GitHub Release](https://img.shields.io/github/v/release/koki-develop/glue-job-action)](https://github.com/koki-develop/glue-job-action/releases/latest)
[![CI](https://img.shields.io/github/actions/workflow/status/koki-develop/glue-job-action/ci.yml?branch=main&logo=github&style=flat&label=ci)](https://github.com/koki-develop/glue-job-action/actions/workflows/ci.yml)
[![Build](https://img.shields.io/github/actions/workflow/status/koki-develop/glue-job-action/build.yml?branch=main&logo=github&style=flat&label=build)](https://github.com/koki-develop/glue-job-action/actions/workflows/build.yml)

Run an AWS Glue job.

## Usage

```yaml
- uses: koki-develop/glue-job-action@v1
  with:
    job: 'my-job'
    arguments: | # Optional
      foo=bar
      baz=qux
```

## LICENSE

[MIT](./LICENSE)
