import { Entity } from "@/shared/core/entity";
import { FromSharedDomains } from "./phone";

type AddressProps = {
    city: string,
    street: string,
    country: string,
    state: string,
    number: number,
    zipcode: string,
    from: FromSharedDomains,
    ownerId: string,
    createdAt: Date
}

export class Address extends Entity<AddressProps> {
    private constructor(props: AddressProps, id?: string) {
        super(props, id)
    }

    public static create(props: AddressProps, id?: string) {
        const address = new Address(props, id);

        return address;
    }
}