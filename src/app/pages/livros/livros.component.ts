import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
})
export class LivrosComponent implements OnInit{
  constructor(private store: StoreService){ }

  ngOnInit(): void {
    this.store.loadCollection("books").subscribe((e) => {
      console.log(e)      
    })
  }

}
