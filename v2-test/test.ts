import { MethodNameMapper } from '../lib/utils';

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
