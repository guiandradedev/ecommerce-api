import { describe, expect, it } from "vitest";

/*
 * Regras de negócio:
 *
 * - stored deve ser maior que 0
 * - price deve ser maior que 0
 * - slug nao pode existir no db
 * - seller deve ser um provider existente
 * - category nao pode ser nulo
 */

describe('Create Product', () =>{ 
    const makeSut = async () => {
        
    }
    it('should create an product', async () =>{ 
        expect(2 + 2).toBe(4)
    })
    it('should throw an error if stored is less than 0', async () =>{})
    it('should throw an error if price is less than 0', async () =>{})
    it('should throw an error if slug already exists', async () =>{})
    it('should throw an error if seller does not exists', async () =>{})
    it('should throw an error if category is empty', async () =>{})
})