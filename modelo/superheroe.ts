export class SuperHeroe {
    id: number;
    name: string;
    url: string;
    image:any;
    biography:any;
    appearance: any;
    work:any;
    powerstats:any

    constructor(id:number, name:string, url: string, image: any, biography: any, appearance:any,
        work:any, powerstats:any) {
        this.id = id,
        this.name = name,
        this.url = url,
        this.image = image,
        this.biography = biography,
        this.appearance = appearance,
        this.work = work,
        this.powerstats = powerstats
    }
 
}
