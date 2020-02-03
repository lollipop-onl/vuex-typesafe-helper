import {MethodNameMapper, ValuesOf} from '../lib/utils';

type Obj = {
  'foo': 'module/foo',
  'bar': 'module/bar',
  'baz': 'module/baz',
}

type b = MethodNameMapper<{}, Obj>;

type AllValues<T extends Record<PropertyKey, PropertyKey>> = {
  [P in keyof T]: { key: P, value: T[P] }
}[keyof T]
type InvertResult<T extends Record<PropertyKey, PropertyKey>> = {
  [P in AllValues<T>['value']]: Extract<AllValues<T>, { value: P }>['key']
}

type a = AllValues<Obj>

export type PickKeyWithoutPayload<P> = P extends Record<
    string,
    (...args: any) => any
    >
  ? ValuesOf<
    { [K in keyof P]: P[K] extends (context: any, payload: NonNullable<any>) => any ? K : undefined }
    >
  : never;

type a2 = {
  foo(state: any, foo: string): void;
  bar(state: any, foo?: string): void;
  baz(state: any): void;
}

type c = PickKeyWithoutPayload<a2>;
