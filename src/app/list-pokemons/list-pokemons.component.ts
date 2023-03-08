import {Component, OnInit, ViewChild} from '@angular/core';
import {NamedAPIResource, Pokemon, PokemonClient} from "pokenode-ts";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.css']
})
export class ListPokemonsComponent implements OnInit {
  title = 'challengeAngular';
  list:Pokemon[]=[];

  text:string=""
  ELEMENT_DATA: NamedAPIResource[] = [];

  displayedColumns: string[] = [ 'name', 'url'];
  dataSource = new MatTableDataSource<NamedAPIResource>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() {
    (async () => {
      const api = new PokemonClient();

      await api
        .listPokemons()
        .then((data) => {
          this.ELEMENT_DATA = data.results;
          console.table(data.results)
          this.dataSource = new MatTableDataSource<NamedAPIResource>(this.ELEMENT_DATA);
        })
        .catch((error) => console.error(error));
    })();

    console.table(this.ELEMENT_DATA)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
