export class Breach {
    Name: string;
    Title: string;
    Domain: string;
    BreachDate: Date;
    AddedDate: Date;
    ModifiedDate: Date;
    PwnCount: number;
    Description: string;
    DataClasses: Array<string>;
    IsVerified: boolean;
    IsFabricated: boolean;
    IsSensitive: boolean;
    IsRetired: boolean;
    IsSpamList: boolean;
}
