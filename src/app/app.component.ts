import { Component } from '@angular/core';
import {NamedAPIResource, Pokemon, PokemonClient} from 'pokenode-ts';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'challengeAngular';
  list:Pokemon[]=[];

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}



