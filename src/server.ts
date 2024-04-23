export function fizzBuzz(n: number): string {
  if (n % 3 === 0 && n % 5 === 0) {
    return 'FizzBuzz';
  }
  if (n % 3 === 0) {
    return 'Fizz';
  }
  if (n % 5 === 0) {
    return 'Buzz';
  }
  return n.toString();
}

export function average(arr: number[]): number {
    if (arr.length === 0) {
        return NaN;
    }
    return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

export function factorial(n: number): number {
    if (n === 0) {
        return 1;
    }
    else if (n < 0) {
        return undefined as unknown as number;
    }
    return n * factorial(n - 1);
}

fizzBuzz(15);
average([1, 2, 3, 4, 5]);
factorial(5);