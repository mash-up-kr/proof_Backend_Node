export type MockService<T> = {
	[K in keyof T]: (...args: any) => any;
};
