import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, first, map } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { AppState, ToastTypes } from 'src/app/core/types/Consts';
import { convertPathToEntry, isPathType } from 'src/app/core/types/Methods';
import { FormModels } from 'src/app/core/types/Unions';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
})
export class SingleComponent implements OnInit {
  // Init
  singleItem$!: Observable<FormModels | null>;
  appState: 'stable' | 'error' | 'loading' = 'stable';

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
        const entry = convertPathToEntry(path);
        this.singleItem$ = this.store.loadItem(entry, itemId).pipe(
          catchError((e: Error) => {
            this.appState = AppState.error;
            this.msg.showToast(
              ToastTypes.error,
              'Não foi possível encontrar o item desejado'
            );
            throw e;
          })
        );
      } else {
        throw new Error('Path not expected');
      }
    });
  }
}
