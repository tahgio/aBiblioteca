import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, first, map } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { AppState, ToastTypes } from 'src/app/core/types/Consts';
import {
  Nullable,
  convertPathToEntry,
  isPathType,
} from 'src/app/core/types/Methods';
import {
  AlbumModel,
  BookModel,
  FilmModel,
  MovieLineModel,
  QuoteModel,
  TrackModel,
} from 'src/app/core/types/Models';
import {
  EntryType,
  FormModels,
  SubFormModels,
} from 'src/app/core/types/Unions';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
})
export class SingleComponent implements OnInit {
  // Init
  // -- Types for assertion on template
  AlbumModel!: AlbumModel;
  FilmModel!: FilmModel;
  BookModel!: BookModel;
  QuoteModel!: QuoteModel;
  MovieLineModel!: MovieLineModel;
  TrackModel!: TrackModel;
  // -- Observables
  singleItem$!: Observable<Nullable<FormModels>>;
  subSingle$!: Observable<SubFormModels[]>;
  // -- Variables
  entry!: EntryType;
  appState: 'stable' | 'error' | 'loading' = 'stable';
  addedAt!: Nullable<Date>;
  lastModified!: Nullable<Date>;
  titleForSubs = {
    books: 'Citações',
    albums: 'Faixas',
    films: 'Falas do filme',
  };

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private msg: MessageService
  ) {}

  ngOnInit(): void {
    // Get itemId from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const itemId = routeParams.get('itemId');
    // Assert path is not null
    if (itemId === null) {
      throw new Error('ItemId not found');
    }
    // Get parent Url to access db
    this.route.url.pipe(first()).subscribe((segment) => {
      // Init
      const path = segment[0].path;
      // Check if path is a valid key
      if (isPathType(path)) {
        this.entry = convertPathToEntry(path);
        this.singleItem$ = this.store.loadItem(this.entry, itemId).pipe(
          map((el) => {
            // Prepare and convert timestamp to dates
            this.addedAt = el?._addedAt ? el._addedAt.toDate() : null;
            this.lastModified = el?._lastModified
              ? el._lastModified.toDate()
              : null;

            return el;
          }),
          catchError((e: Error) => {
            this.appState = AppState.error;
            this.msg.showToast(
              ToastTypes.error,
              'Não foi possível encontrar o item desejado'
            );
            throw e;
          })
        );
        this.subSingle$ = this.store.loadSub(this.entry, itemId).pipe(
          catchError((e: Error) => {
            this.appState = AppState.error;
            this.msg.showToast(
              ToastTypes.error,
              `Ocorreu um erro ao localizar ${this.titleForSubs[this.entry]}`
            );
            throw e;
          })
        );
      } else {
        throw new Error('Path not expected');
      }
    });
  }

  onEdit() {
    this.msg.showToast(
      'warning',
      'Esta funcionalidade ainda não foi implementada'
    );
  }

  sortAlbumTracks() {
    return (a: any, b: any) => {
      return a.trackNumber - b.trackNumber;
    };
  }
}
