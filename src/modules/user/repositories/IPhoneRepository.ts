import { Phone } from "@/modules/user/domain";

export interface IPhoneRepository {
    createPhone(data: Phone | Phone[]): Promise<void>
}