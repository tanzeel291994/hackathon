export class Post {
 
    constructor(public type:string,public title: string,public text: string,public liked:boolean,public intrested:boolean,
        public uname?:string,
        public uinfo?:string,
        public postcreated?:Date,
        public postlikes?:number,
        public postintrests?:number,
        public postId?: string, public userId?: string) {}
}