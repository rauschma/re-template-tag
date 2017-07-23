# re-template-tag: easily compose regular expressions

This package provides the template tag `re` for composing regular expressions.

## Basic syntax

Syntax: the following two expressions produce the same regular expression.

```js
re`abc``gu`
/abc/gu
```

## Composing regular expressions

```js
import {re} from 're-template-tag';

const RE_YEAR = /([0-9]{4})/;
const RE_MONTH = /([0-9]{2})/;
const RE_DAY = /([0-9]{2})/;
const RE_DATE = re`^${RE_YEAR}-${RE_MONTH}-${RE_DAY}$``u`;

RE_DATE.test('2017-01-23'); // true
```

## Acknowledgement

The syntax for setting flags is based on an idea by [@vsemozhetbyt](https://twitter.com/vsemozhetbyt).
