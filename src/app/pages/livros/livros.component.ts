import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
})
export class LivrosComponent implements OnInit, OnDestroy {
  constructor(private store: StoreService) {}

  async ngOnInit() {
    // this.store.loadCollection('books').subscribe((e) => {
    //   console.log(e);
    // });
    // this.store.loadRandomDocFromSub('quotes').subscribe((e) => {
    //   console.log(e);
    // });
  }

  ngOnDestroy(): void {}
}
