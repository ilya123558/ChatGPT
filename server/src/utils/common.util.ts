export const base64Decode = (str: string) => Buffer.from(str, 'base64').toString('utf8');

export const stripAddress = (address: string, start = 4, end = 4) =>
  address.substring(0, start) + ' .... ' + address.substr(address.length - end);
