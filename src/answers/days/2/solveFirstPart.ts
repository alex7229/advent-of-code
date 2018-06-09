const splitByRows = (input: string): string[] => {
    return input.split('\n');
};

const parseRow = (input: string): number[] => {
    const stringNumbers: string[] = input.split('\t');
    return stringNumbers.map((stringNumber) => {
        return parseInt(stringNumber, 10);
    });
};

const parseInput = (input: string):  number[][] => {
    return splitByRows(input).map(row => {
        return parseRow(row);
    });
};

const checkParsedNumbers = (numbers: number[][]): boolean => {
    return numbers.every((row) => {
        return row.every((currentNumber => {
            return !Number.isNaN(currentNumber);
        }));
    });
};

const calculateAnswer = (rows: number[][]): number => {
    return rows.map(row => {
        const max = Math.max(...row);
        const min = Math.min(...row);
        return max - min;
    }).reduce((total, current) => {
        return total + current;
    });
};

const solveFirstPart = (input: string): string => {
    const data: number[][] = parseInput(input);
    if (!checkParsedNumbers(data)) {
        return 'input should be only from numbers. It`s incorrect';
    }
    return calculateAnswer(data).toString();
};

export { solveFirstPart, parseInput, checkParsedNumbers };