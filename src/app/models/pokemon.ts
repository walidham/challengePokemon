export interface  Aibility{
  name:string,
  url:string,
  is_hidden:boolean,
  slot:number
}

interface Form{
  name:string,
  url:string,
}

interface GameIndice{

}
interface Pokemon{
  abilities:Aibility[],
  base_experience:number,
}
