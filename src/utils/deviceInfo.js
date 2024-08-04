import DeviceInfo from 'react-native-device-info';

export const getDeviceDetails = async () => {
  const deviceDetails = {
    DeviceIsVirtual: await DeviceInfo.isEmulator(),
    DeviceManufacturer: await DeviceInfo.getManufacturer(),
    DeviceModel: DeviceInfo.getModel(),
    DevicePlatform: DeviceInfo.getSystemName(),
    DeviceSerial: await DeviceInfo.getSerialNumber(),
    DeviceVersion: DeviceInfo.getSystemVersion(),
    UniqueId: await DeviceInfo.getUniqueId(),
  };

  return deviceDetails;
};
