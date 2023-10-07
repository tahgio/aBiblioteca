import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, first, map } from 'rxjs';
import { StoreService } from 'src/app/core/services/store/store.service';
import { allItemsInfo } from 'src/app/core/types/Consts';
import { convertPathToEntry, isPathType } from 'src/app/core/types/Methods';
import { AlbumModel, BookModel, FilmModel } from 'src/app/core/types/Models';
import { EntryType, FormModels } from 'src/app/core/types/Unions';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  // Init
  entry!: EntryType;
  info = allItemsInfo;
  // -- Types for assertion on template
  AlbumModel!: AlbumModel;
  FilmModel!: FilmModel;
  BookModel!: BookModel;
  // Observables
  allItems$!: Observable<FormModels[]>;

  constructor(private store: StoreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.pipe(first()).subscribe((segment) => {
      // Init
      const path = segment[0].path;
      // Check if path is a valid key
      if (isPathType(path)) {
        // Get entry from path
        this.entry = convertPathToEntry(path);
        // Get items from entry
        this.allItems$ = this.store.loadCollection(this.entry).pipe(
          map((el) => {
            return el.sort((a: FormModels, b: FormModels) => {
              return a.title.localeCompare(b.title, 'pt');
            });
          })
        );
      }
    });
  }
}
