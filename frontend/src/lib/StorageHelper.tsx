class StorageHelper {
	public static getItem(key: string, defaultValue: string | null = null): string | null {
		try {
			const item = localStorage.getItem(key);
			return item ?? defaultValue;
		} catch (err) {
			console.error('error', err);
			return defaultValue;
		}
	}

	public static removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	public static setItem(key: string, value: string): void {
		localStorage.setItem(key, value);
	}
}

export default StorageHelper
