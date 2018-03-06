export class Post {
 
    constructor(public type:number,public title: string,public text: string,
        public uname?:string,
        public uinfo?:string,
        public postcreated?:Date,
        public postId?: string, public userId?: string) {}
}