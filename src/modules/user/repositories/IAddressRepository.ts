import { Address } from "@/modules/user/domain";

export interface IAddressRepository {
    createAddress(data: Address | Address[]): Promise<void>
}