# micromark-build

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Sponsors][sponsors-badge]][opencollective]
[![Backers][backers-badge]][opencollective]
[![Chat][chat-badge]][chat]

A tiny CLI to build micromark development source code into production.

If you are making a micromark extension or are otherwise integrating with
its code, you *should* use this.

State machines are hard: assertions, debugging messages, and readable names
are great to develop with, but those also slow in production.

## Install

[npm][]:

```sh
npm install micromark-build --save-dev
```

## Use

Say we have this folder (`my-micromark-extension`):

```txt
dev/lib/core.js
dev/lib/util.js
dev/index.js
```

And we add `micromark-build` in a `build` script in `package.json`:

```js
"scripts": {
  "build": "micromark-build"
},
```

Now, running that with `npm run build`, we’d get:

```diff
 dev/lib/core.js
 dev/lib/util.js
 dev/index.js
+lib/core.js
+lib/util.js
+index.js
```

To expose the production code by default, and the `dev/` files on a condition,
use an export map in `package.json`:

```json
"exports": {
  "development": "./dev/index.js",
  "default": "./index.js"
},
```

Users can then use `node --conditions development` to use the dev files.

## CLI

No interface or options.
Run it and get files out.

## Security

See [`security.md`][securitymd] in [`micromark/.github`][health] for how to
submit a security report.

## Contribute

See [`contributing.md`][contributing] in [`micromark/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/micromark/micromark/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark.svg

[coverage]: https://codecov.io/github/micromark/micromark

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[opencollective]: https://opencollective.com/unified

[npm]: https://docs.npmjs.com/cli/install

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/micromark/micromark/discussions

[license]: https://github.com/micromark/micromark/blob/main/license

[author]: https://wooorm.com

[health]: https://github.com/micromark/.github

[securitymd]: https://github.com/micromark/.github/blob/HEAD/security.md

[contributing]: https://github.com/micromark/.github/blob/HEAD/contributing.md

[support]: https://github.com/micromark/.github/blob/HEAD/support.md

[coc]: https://github.com/micromark/.github/blob/HEAD/code-of-conduct.md