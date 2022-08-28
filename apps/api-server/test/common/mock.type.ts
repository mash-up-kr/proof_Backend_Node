export type MockType<T> = {
	[K in keyof T]?: jest.Mock<{}>;
};

export type MockService<T> = {
	[K in keyof T]?: any;
};
