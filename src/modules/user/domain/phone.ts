import { Entity } from "@/shared/core/entity";

export type FromSharedDomains = 'CONSUMER' | 'PROVIDER'

type PhoneProps = {
    countryCode: number,
    ddd: number,
    phone: number,
    from: FromSharedDomains,
    ownerId: string,
    createdAt: Date
}

export class Phone extends Entity<PhoneProps> {
    private constructor(props: PhoneProps, id?: string) {
        super(props, id)
    }

    public static create(props: PhoneProps, id?: string) {
        const phone = new Phone(props, id);

        return phone;
    }
}