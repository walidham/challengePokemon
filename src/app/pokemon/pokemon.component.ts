import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Pokemon, PokemonClient} from "pokenode-ts";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  routeP: ActivatedRoute
  name:string;

  pokemon:Pokemon;
  constructor( private route: ActivatedRoute) {
    this.routeP = route;

  }

  ngOnInit(): void {
    this.name = this.routeP.snapshot.paramMap.get('name')?this.routeP.snapshot.paramMap.get('name')+'':'';

    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonByName(this.name)
        .then((data) => this.pokemon = data) // will output "Luxray"
        .catch((error) => console.error(error));
    })();
  }

}
