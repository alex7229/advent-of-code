const findArraySum = (input: number[]): number => {
    return input.reduce((total, current) => {
        return total + current;
    });
};

const checkInput = (input: string): boolean => {
    return /^[\d]+$/.test(input);
};

const calculateCaptcha = (input: string): number => {
    const regExp: RegExp = /([\d])\1+/g;
    const match: RegExpMatchArray | null = input.match(regExp);
    if (match === null) {
        // no similar digits at all
        return 0;
    }
    return findArraySum(
            match.map((digitsMatch) => {
                const digit: number = parseInt(digitsMatch[0], 10);
                return digit * (digitsMatch.length - 1);
            })
    );
};

const getAnswer = (input: string): string => {
    if (!checkInput(input)) {
        return 'Only numbers should be in the input';
    }
    input = input + input[0];
    return calculateCaptcha(input).toString();
};

export { getAnswer, checkInput };