import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable, first } from 'rxjs';
import { StoreService } from 'src/app/core/services/store/store.service';
import { EntryType } from 'src/app/core/types/Consts';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
})
export class LivrosComponent implements OnInit {
  // Init
  books$!: Observable<DocumentData[]>;
  // Constructor
  constructor(private store: StoreService) {}

  async ngOnInit() {
    this.books$ = this.store.loadCollection(EntryType.books);
    // this.store.loadRandomDocFromSub('quotes').subscribe((e) => {
    //   console.log(e);
    // });
  }
}
