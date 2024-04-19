import { describe, it, expect } from 'vitest';
import { fizzBuzz, average, factorial } from './server';

describe ('FizzBuzz', () => {
    it('should return fizzbuzz for multiples of 3 and 5', () => {
        expect(fizzBuzz(45)).toBe('FizzBuzz');
    });
    it('should return fizz for multiples of 3', () => {
        expect(fizzBuzz(9)).toBe('Fizz');
    });
    it('should return buzz for multiples of 5', () => {
        expect(fizzBuzz(10)).toBe('Buzz');
    });
    it('should return the number for all other cases', () => {
        expect(fizzBuzz(7)).toBe('7');
    });
});

describe('calculate anverage in an array', ()=>{
    it('should return NaN if array is empty', ()=>{
        expect(average([1, 2, 3])).toBe(2);
    })
    it('should return 2 if array is [1, 2, 3]', ()=>{
        expect(average([1, 2, 3])).toBe(2);
    });
})

describe('calculate factorial of a number', ()=>{
    it('should return 1 if number is 0', ()=>{
        expect(factorial(0)).toBe(1);
    })
    it('should return 120 if number is 5', ()=>{
        expect(factorial(5)).toBe(120);
    })
    it('should return 720 if number is 6', ()=>{
        expect(factorial(6)).toBe(720);
    });
    it('should return undefined if number is negative', ()=>{
        expect(factorial(-186)).toBe(undefined);
    });
});