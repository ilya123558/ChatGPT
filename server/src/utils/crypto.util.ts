import { TonClient } from '@eversdk/core';
import { AccountAddressType, ResultOfVerifySignature } from '@eversdk/core/dist/modules';
import { libNode } from '@eversdk/lib-node';

export class CryptoUtil {
  readonly client = new TonClient();

  constructor() {
    TonClient.useBinaryLibrary(libNode);
    this.client = new TonClient({
      network: {
        endpoints: [process.env.EVER_HTTPS_ENDPOINT],
      },
    });
  }

  async verifySignature(signed: string, signature: string): Promise<ResultOfVerifySignature> {
    return await this.client.crypto.verify_signature({
      signed: signed,
      public: signature,
    });
  }

  async isAccountAddress(address: string): Promise<boolean> {
    try {
      const addressType = await this.client.utils.get_address_type({
        address,
      });

      return addressType.address_type === AccountAddressType.Hex;
    } catch (e) {
      return false;
    }
  }
}
