export class RangeResponse {
    suffix: string;
    count: number;

    constructor() {}

    deserialise(rangeResponse: string): RangeResponse {
        // Split the Range API response
        const splitSuffix: Array<string> = rangeResponse.split(':');
        // Store the response in the class
        this.suffix = splitSuffix[0];
        this.count = Number(splitSuffix[1]);
        // Return the mutated object
        return this;
    }
}
