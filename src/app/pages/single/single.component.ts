import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
})
export class SingleComponent implements OnInit {
  itemId!: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get itemId from the current route.
    const routeParams = this.route.snapshot.paramMap;
    this.itemId = routeParams.get('itemId');
  }
}
