export const requestMock = jest.fn();

export const HereToHelpApiGateway = jest.fn().mockImplementation(() => ({
    request: requestMock,
}));