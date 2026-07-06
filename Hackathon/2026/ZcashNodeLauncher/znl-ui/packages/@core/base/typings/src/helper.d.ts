import type { ComputedRef, MaybeRef } from 'vue';

/**
 * Deep Recursive Properties is optional
 */
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Deep Recursive Properties to Read Only
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Any type of asymptomatic function
 */

type AnyPromiseFunction<T extends any[] = any[], R = void> = (
  ...arg: T
) => PromiseLike<R>;

/**
 * Normal function of any type
 */
type AnyNormalFunction<T extends any[] = any[], R = void> = (...arg: T) => R;

/**
 * Any type of function
 */
type AnyFunction<T extends any[] = any[], R = void> =
  | AnyNormalFunction<T, R>
  | AnyPromiseFunction<T, R>;

/**
 *  T null Packaging
 */
type Nullable<T> = null | T;

/**
 * T  Not null Packaging
 */
type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * String Type Object
 */
type Recordable<T> = Record<string, T>;

/**
 * String type object (read-only)
 */
interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T;
}

/**
 * SetTimeout returns the value type
 */
type TimeoutHandle = ReturnType<typeof setTimeout>;

/**
 * SetInterval returns value type
 */
type IntervalHandle = ReturnType<typeof setInterval>;

/**
 * Maybe it's a calculation ref, or a getter function*
 */
type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

/**
 * Maybe it's a ref, or a normal value, or a getter function*
 */
type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

type Merge<O extends object, T extends object> = {
  [K in keyof O | keyof T]: K extends keyof T
    ? T[K]
    : K extends keyof O
      ? O[K]
      : never;
};

/**
 * T = [
 *  { name: string; age: number; },
 *  { sex: 'male' | 'female'; age: string }
 * ]
 * =>
 * MergeAll<T> = {
 *  name: string;
 *  sex: 'male' | 'female';
 *  age: string
 * }
 */
type MergeAll<
  T extends object[],
  R extends object = Record<string, any>,
> = T extends [infer F extends object, ...infer Rest extends object[]]
  ? MergeAll<Rest, Merge<R, F>>
  : R;

type EmitType = (name: Name, ...args: any[]) => void;

type MaybePromise<T> = Promise<T> | T;

export type {
  AnyFunction,
  AnyNormalFunction,
  AnyPromiseFunction,
  DeepPartial,
  DeepReadonly,
  EmitType,
  IntervalHandle,
  MaybeComputedRef,
  MaybePromise,
  MaybeReadonlyRef,
  Merge,
  MergeAll,
  NonNullable,
  Nullable,
  ReadonlyRecordable,
  Recordable,
  TimeoutHandle,
};