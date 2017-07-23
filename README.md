# re-template-tag: easily compose regular expressions

This package provides the template tag `re` for composing regular expressions.

## Basic syntax

Syntax: the following two expressions produce the same regular expression.

```js
re`/abc/gu`
/abc/gu
```

## Composing regular expressions

```js
import {re} from 're-template-tag';

const RE_YEAR = /([0-9]{4})/;
const RE_MONTH = /([0-9]{2})/;
const RE_DAY = /([0-9]{2})/;
const RE_DATE = re`/^${RE_YEAR}-${RE_MONTH}-${RE_DAY}$/u`;

RE_DATE.test('2017-01-23'); // true
```

## More information

* Take a look at [the unit tests](https://github.com/rauschma/re-template-tag/blob/master/test/index_test.js).
* Check out [the blog post on re-template-tag](http://2ality.com/2017/07/re-template-tag.html).

## Acknowledgement

The syntax for separating flags from the actual regular expression is based on an idea by [Mathias Bynens](https://twitter.com/mathias/).
