/** 型ユーティリティのテスト */

import { assert, IsExact } from 'conditional-type-checks';
import { ValueOf, Equal, NeverableDefault, Namespaced, PickPayload, PickKeyWithoutPayload } from '../lib/utils';

describe('[utils] ValueOf 型', () => {
  test('Standard', () => {
    type T = ValueOf<{ foo: 0; bar: '100'; baz: { hello: 'world '} }>;
    type R = 0 | '100' | { hello: 'world '};

    assert<IsExact<T, R>>(true);
  });
});

describe('[utils] Equal 型', () => {
  test('成立する', () => {
    assert<Equal<0, 0>>(true);
    assert<Equal<'hello', 'hello'>>(true);
    assert<Equal<RegExp, RegExp>>(true);
    assert<Equal<() => number, () => number>>(true);
    assert<Equal<{ hello: 'world' }, { hello: 'world' }>>(true);
  });

  test('成立しない', () => {
    assert<Equal<0, 100>>(false);
    assert<Equal<'hello', 'world'>>(false);
    assert<Equal<RegExp, Function>>(false);
    assert<Equal<() => number, () => string>>(false);
    assert<Equal<{ hello: 'world' }, { hello: 100 }>>(false);
  });
});

describe('[utils] NeverableDefault 型', () => {
  test('Standard', () => {
    assert<IsExact<NeverableDefault<never, 0>, 0>>(true);
    assert<IsExact<NeverableDefault<never, 'hello'>, 'hello'>>(true);
    assert<IsExact<NeverableDefault<never, {}>, {}>>(true);
    assert<IsExact<NeverableDefault<never, () => string>, () => string>>(true);
    assert<IsExact<NeverableDefault<undefined, 0>, undefined>>(true);
    assert<IsExact<NeverableDefault<null, 0>, null>>(true);
    assert<IsExact<NeverableDefault<{}, 0>, {}>>(true);
    assert<IsExact<NeverableDefault<0, -1>, 0>>(true);
    assert<IsExact<NeverableDefault<string, 0>, string>>(true);
  });
});

describe('[utils] PickPayload 型', () => {
  test('Standard', () => {
    assert<IsExact<PickPayload<(context: any) => void, 0>, 0>>(true);
    assert<IsExact<PickPayload<(context: any, payload?: 'hello') => void, 0>, 'hello' | undefined>>(true);
    assert<IsExact<PickPayload<(context: any, payload: 'hello') => void, 0>, 'hello'>>(true);
    assert<IsExact<PickPayload<(context: any, payload: 'hello' | undefined) => void, 0>, 'hello' | undefined>>(true);
    assert<IsExact<PickPayload<(context: any, payload: 'hello' | null) => void, 0>, 'hello' | null>>(true);
  });
});

describe('[utils] PickKeyWithoutPayload 型', () => {
  test('Standard', () => {
    assert<IsExact<PickKeyWithoutPayload<{}>, never>>(true);
    assert<IsExact<PickKeyWithoutPayload<{
      foo: (context: any, payload: string) => void;
    }>, never>>(true);
    assert<IsExact<PickKeyWithoutPayload<{
      foo: (context: any) => void;
    }>, 'foo'>>(true);
    assert<IsExact<PickKeyWithoutPayload<{
      foo: (context: any) => void;
      bar: (context: any, payload?: string) => void;
      baz: (context: any, payload: string) => void;
      qux: (context: any, payload: string | undefined) => void;
      quux: (context: any, payload: string | null) => void;
    }>, 'foo' | 'bar' | 'qux'>>(true);
  })
});

describe('[utils] Namespaced 型', () => {
  test('Standard', () => {
    assert<IsExact<Namespaced<'foo', 'bar'>, 'foo/bar'>>(true);
    assert<IsExact<Namespaced<'foo/bar', 'baz'>, 'foo/bar/baz'>>(true);
    assert<IsExact<Namespaced<never, 'foo'>, 'foo'>>(true);
  });
});
