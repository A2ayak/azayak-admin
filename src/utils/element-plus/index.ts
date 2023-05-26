import type { ExtractPropTypes, PropType } from 'vue'
import { fromPairs } from 'lodash-es'

export function addUnit(value?: string | number, defaultUnit = 'px') {
	if (!value) return ''
	if (isNumber(value) || isStringNumber(value)) {
		return `${value}${defaultUnit}`
	} else if (isString(value)) {
		return value
	}
	console.warn('binding value must be a string or number')
}

export const isUndefined = (val: any): val is undefined => val === undefined
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isString = (val: any) => typeof val === 'string'
export const isObject = (val: any) => val !== null && typeof val === 'object'

export const epPropKey = '__epPropKey'
/**
 * Native prop types, e.g: `BooleanConstructor`, `StringConstructor`, `null`, `undefined`, etc.
 *
 * 原生 prop `类型，BooleanConstructor`、`StringConstructor`、`null`、`undefined` 等
 */
export type NativePropType = ((...args: any) => any) | { new (...args: any): any } | undefined | null
export type IfNativePropType<T, Y, N> = [T] extends [NativePropType] ? Y : N

export const isStringNumber = (val: string): boolean => {
	if (!isString(val)) {
		return false
	}
	return !Number.isNaN(Number(val))
}

/**
 * Handling default values for input (constraints)
 *
 * 处理输入参数的默认值（约束）
 */
export type EpPropInputDefault<Required extends boolean, Default> = Required extends true
	? never
	: Default extends Record<string, unknown> | Array<any>
	? () => Default
	: (() => Default) | Default

export type IfNever<T, Y = true, N = false> = [T] extends [never] ? Y : N

export type IfUnknown<T, Y, N> = [unknown] extends [T] ? Y : N

export type UnknownToNever<T> = IfUnknown<T, never, T>

export type Writable<T> = { -readonly [P in keyof T]: T[P] }
export type WritableArray<T> = T extends readonly any[] ? Writable<T> : T

type Value<T> = T[keyof T]
export type ExtractPropType<T extends object> = Value<
	ExtractPropTypes<{
		key: T
	}>
>
export type ResolvePropType<T> = IfNever<
	T,
	never,
	ExtractPropType<{
		type: WritableArray<T>
		required: true
	}>
>

/**
 * Merge Type, Value, Validator types
 * 合并 Type、Value、Validator 的类型
 *
 * @example
 * EpPropMergeType<StringConstructor, '1', 1> =>  1 | "1" // ignores StringConstructor
 * EpPropMergeType<StringConstructor, never, number> =>  string | number
 */
export type EpPropMergeType<Type, Value, Validator> =
	| IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
	| UnknownToNever<Value>
	| UnknownToNever<Validator>

export type EpPropInput<Type, Value, Validator, Default extends EpPropMergeType<Type, Value, Validator>, Required extends boolean> = {
	type?: Type
	required?: Required
	values?: readonly Value[]
	validator?: ((val: any) => val is Validator) | ((val: any) => boolean)
	default?: EpPropInputDefault<Required, Default>
}

export type EpPropConvert<Input> = Input extends EpPropInput<infer Type, infer Value, infer Validator, any, infer Required>
	? EpPropFinalized<Type, Value, Validator, Input['default'], Required>
	: never

export type EpPropFinalized<Type, Value, Validator, Default, Required> = EpProp<
	EpPropMergeType<Type, Value, Validator>,
	UnknownToNever<Default>,
	Required
>
export type EpProp<Type, Default, Required> = {
	readonly type: PropType<Type>
	readonly required: [Required] extends [true] ? true : false
	readonly validator: ((val: unknown) => boolean) | undefined
	[epPropKey]: true
} & IfNever<Default, unknown, { readonly default: Default }>
export const isEpProp = (val: unknown): val is EpProp<any, any, any> => isObject(val) && !!(val as any)[epPropKey]
const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val: any, key: any) => hasOwnProperty.call(val, key)
export const buildProp = <
	Type = never,
	Value = never,
	Validator = never,
	Default extends EpPropMergeType<Type, Value, Validator> = never,
	Required extends boolean = false
>(
	prop: EpPropInput<Type, Value, Validator, Default, Required>,
	key?: string
): EpPropFinalized<Type, Value, Validator, Default, Required> => {
	// filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
	if (!isObject(prop) || isEpProp(prop)) return prop as any

	const { values, required, default: defaultValue, type, validator } = prop

	const _validator =
		values || validator
			? (val: unknown) => {
					let valid = false
					let allowedValues: unknown[] = []

					if (values) {
						allowedValues = Array.from(values)
						if (hasOwn(prop, 'default')) {
							allowedValues.push(defaultValue)
						}
						valid ||= allowedValues.includes(val)
					}
					if (validator) valid ||= validator(val)

					if (!valid && allowedValues.length > 0) {
						const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(', ')
					}
					return valid
			  }
			: undefined

	const epProp: any = {
		type,
		required: !!required,
		validator: _validator,
		[epPropKey]: true,
	}
	if (hasOwn(prop, 'default')) epProp.default = defaultValue
	return epProp
}
export type IfEpProp<T, Y, N> = T extends { [epPropKey]: true } ? Y : N

export const buildProps = <Props extends Record<string, { [epPropKey]: true } | NativePropType | EpPropInput<any, any, any, any, any>>>(
	props: Props
): {
	[K in keyof Props]: IfEpProp<Props[K], Props[K], IfNativePropType<Props[K], Props[K], EpPropConvert<Props[K]>>>
} => fromPairs(Object.entries(props).map(([key, option]) => [key, buildProp(option as any, key)])) as any
