export class SuperHeroe {
    id: number;
    name: string;
    url: string;
    image:any;
    biography:any;
    appearance: any;
    work:any

    constructor(id:number, name:string, url: string, image: any, biography: any, appearance:any,
        work:any) {
        this.id = id,
        this.name = name,
        this.url = url,
        this.image = image,
        this.biography = biography,
        this.appearance = appearance,
        this.work = work 
    }

}
