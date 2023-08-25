import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookStatusList, MovieStatusList } from 'src/app/core/types/Models';
import { UnionToArray } from 'src/app/core/types/Methods';
import { inArrayValidator } from 'src/app/core/validators/inArrayValidator';
import { ItemType } from 'src/app/core/types/Unions';
import { bookStatusList, filmStatusList } from 'src/app/core/types/Consts';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
})
export class AdicionarComponent implements OnInit {
  item: ItemType = 'Livro';
  itemTypes: UnionToArray<ItemType> = ['Livro', 'Filme', 'Album'];

  tagInput: string = '';
  tags: string[] = [];

  bookForm!: FormGroup;
  filmForm!: FormGroup;
  albumForm!: FormGroup;

  mainForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // BOOK
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: [''],
      cover: ['', Validators.required],
      year: ['', Validators.required],
      pages: [
        '',
        [Validators.min(10), Validators.max(9999), Validators.required],
      ],
      tags: [[]],
      status: ['', [Validators.required, inArrayValidator(bookStatusList)]],
      rating: [1, [Validators.min(1), Validators.max(5)]],
    });
    this.mainForm = this.bookForm;
    // FILM
    this.filmForm = this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      writer: ['', Validators.required],
      storyline: ['', Validators.required],
      country: ['', Validators.required],
      genre: [''],
      cover: ['', Validators.required],
      year: ['', Validators.required],
      runtime: ['', [Validators.required]],
      tags: [[]],
      status: ['', [Validators.required, inArrayValidator(filmStatusList)]],
      rating: [1, [Validators.min(1), Validators.max(5)]],
    });
    // ALBUM
    this.albumForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      genre: [''],
      cover: ['', Validators.required],
      albumReview: this.fb.group({
        reviewer: [''],
        review: [''],
      }),
      year: ['', Validators.required],
      tags: [[]],
      rating: [1, [Validators.min(1), Validators.max(5)]],
    });
  }

  onItemSelect(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.item = selectedType as typeof this.item;
    if (selectedType === 'Livro') {
      this.mainForm = this.bookForm;
    } else if (selectedType === 'Filme') {
      this.mainForm = this.filmForm;
    } else if (selectedType === 'Album') {
      this.mainForm = this.albumForm;
    }
  }
}
