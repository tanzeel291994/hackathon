export class Profile {
    constructor(
            public firstName?: string,
            public lastName?: string,
            public language?:string,
            public yob?:number,
            public status?:string,
            public occupation?:string,
            public qualification?:string,
            public field?:string,
            public intrests?:string[],
            public location?:string,
            public intrestInfo?:string ,
            public userId?:string,
            public followers?:number[]
        ) {}
}