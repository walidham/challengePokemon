import {Component, OnInit, ViewChild} from '@angular/core';
import {NamedAPIResource, Pokemon, PokemonClient} from "pokenode-ts";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import * as events from "events";

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.css']
})
export class ListPokemonsComponent implements OnInit {
  title = 'challengeAngular';
  list:Pokemon[]=[];

  searchValue:string=""
  ELEMENT_DATA: NamedAPIResource[] = [];

  displayedColumns: string[] = [ 'name', 'url'];
  dataSource = new MatTableDataSource<NamedAPIResource>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() {
    (async () => {
      const api = new PokemonClient();

      await api
        .listPokemons(1,1000)
        .then((data) => {
          this.ELEMENT_DATA = data.results;
          console.table(data.results)
          this.dataSource = new MatTableDataSource<NamedAPIResource>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        })
        .catch((error) => console.error(error));
    })();

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(event:Event){
    //alert(this.searchValue);
    if(this.searchValue===""){

      this.dataSource = new MatTableDataSource<NamedAPIResource>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      return;
    }
    let table = this.ELEMENT_DATA.filter((e)=>{
      return e.name.indexOf(this.searchValue)>-1;
    })
    //this.ELEMENT_DATA = table;
    console.table(table)
    this.dataSource = new MatTableDataSource<NamedAPIResource>(table);
    this.dataSource.paginator = this.paginator;
  }
}
