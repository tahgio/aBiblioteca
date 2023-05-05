import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
})
export class LivrosComponent implements OnInit{
  tagArray!: string[]
  constructor(private store: StoreService){ }

  async ngOnInit() {
    this.store.loadCollection("books").subscribe((e) => {
      console.log(e)      
    })

   this.tagArray = await this.store.getAllTags("books")
    console.log(this.tagArray)
  }

}
