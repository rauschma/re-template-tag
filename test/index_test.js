import test from 'ava';
import {re} from '../esm/index.js';

test('Composing regular expressions', t => {
    const RE_YEAR = /[0-9]{4}/;
    const RE_MONTH = /[0-9]{2}/;
    const RE_DAY = /[0-9]{2}/;
	t.is(re`^(${RE_YEAR})-(${RE_MONTH})-(${RE_DAY})$``u`.source, '^([0-9]{4})-([0-9]{2})-([0-9]{2})$');
});
test('Setting flags', t => {
    const regexp1 = re`abc``gu`;
    t.true(regexp1 instanceof RegExp);
	t.is(regexp1.source, 'abc');
	t.is(regexp1.flags, 'gu');

    const regexp2 = re`xyz```;
    t.true(regexp2 instanceof RegExp);
	t.is(regexp2.source, 'xyz');
	t.is(regexp2.flags, '');
});
test('Computed flags', t => {
    const regexp = re`abc`('g'+'u');
    t.true(regexp instanceof RegExp);
	t.is(regexp.source, 'abc');
	t.is(regexp.flags, 'gu');
});
test('Escaping special characters in strings', t => {
	t.is(re`-${'.'}-``u`.source, '-\\.-');
});
test('Use “raw” backslashes like in regular expressions', t => {
	t.is(re`\.``u`.source, '\\.');
});
test('Slashes don’t need to be escaped', t => {
	t.true(re`^/$``u`.test('/'));
});
