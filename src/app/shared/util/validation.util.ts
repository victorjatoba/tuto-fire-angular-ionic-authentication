/**
 * @name validation.util
 *
 * @description
 * Util methods' validation.
 */
export class ValidationUtil {

    /**
     * Verify if the value has no content.
     *
     * @param value The value to be verified.
     */
    static isEmpty(value): boolean {
        let isEmpty = false;

        if (value === null || value === undefined || value === '') {
            isEmpty = true;
        }

        return isEmpty;
    }

    /**
     * Verify if the array has no content.
     *
     * @param array The array to be defined.
     * @see Array
     */
    static isArrayEmpty(array: Array<any>): boolean {
        let isEmpty = false;

        if (array === null || array === undefined || array.length <= 0) {
            isEmpty = true;
        }

        return isEmpty;
    }

    /**
     * Verify if the set data structure has no content.
     *
     * @param set The set to be defined.
     * @see Set
     */
    static isSetEmpty(set: Set<any>): boolean {
        let isEmpty = false;

        if (set === null || set === undefined || set.size <= 0) {
            isEmpty = true;
        }

        return isEmpty;
    }

    /**
     * It returns an empty string in case of undefined values
     * @param value string to be analyzed
     */
    static getValue(value: string): string {
        if (value === undefined) {
            return '';
        } else {
            return value;
        }
    }

    /**
     * Verify if the value has content.
     *
     * @param value The value to be verified.
     */
    static exists(value): boolean {
        return !ValidationUtil.isEmpty(value);
    }
}