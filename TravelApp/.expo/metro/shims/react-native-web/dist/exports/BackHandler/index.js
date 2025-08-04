jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  exitApp: jest.fn(),
  addEventListener: jest.fn(() => ({
    remove: jest.fn(),
  })),
}));
