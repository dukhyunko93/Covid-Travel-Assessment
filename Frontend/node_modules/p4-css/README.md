# p4-css

[`nano-css`](https://github.com/streamich/nano-css) configuration for P4.

## Installation

```shell
npm i p4-css
```

## Usage

Import it.

```js
import {rule, globalCss} from 'p4-css';
```

Inject global CSS into your page.

```js
globalCss();
```

Emit CSS and receive class name.

```js
const className = rule({
  border: '1px solid red',
});
```

## License

[Unlicense](LICENSE) &mdash; public domain.
