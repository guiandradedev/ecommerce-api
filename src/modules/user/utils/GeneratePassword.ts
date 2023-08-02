type GeneratePasswordRequest = {
    type: 'string' | 'number',
    size: number,
}

export class GeneratePassword {
    execute({ type, size }: GeneratePasswordRequest): {password: string} {
        let password = ""
        switch (type) {
            case 'string': {
                for(let i=0; i<size; i++) {
                    password += String.fromCharCode(65+Math.floor(Math.random() * 26));
                }
                break;
            }
            case 'number': {
                for(let i=0; i<size; i++) {
                    password += Math.floor(Math.random() * 9);
                }
                break;
            }
            default: {
                password = Math.random().toString(36).substring(-size).toUpperCase();
                break;
            }
        }
        return {
            password,
        }
    }
}