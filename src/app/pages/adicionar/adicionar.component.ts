import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { inArrayValidator } from 'src/app/core/validators/inArrayValidator';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
})
export class AdicionarComponent implements OnInit {
  item: 'Livro' | 'Filme' | 'Album' = 'Livro';
  itemTypes = ['Livro', 'Filme', 'Album'];
  bookStatusList = ['Lido', 'Lendo', 'Quero Ler', 'Em Espera', 'Abandonado'];
  filmStatusList = ['Visto', 'Quero Ver', 'Abandonado'];
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
      status: [
        '',
        [Validators.required, inArrayValidator(this.bookStatusList)],
      ],
      rating: [1, [Validators.min(1), Validators.max(5)]],
      quotesForm: this.fb.group({
        quotes: this.fb.array([]),
      }),
    });
    this.mainForm = this.bookForm
    // FILM
    this.filmForm = this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      writer: ['', Validators.required],
      storyline: ['', Validators.required],
      country: ['', Validators.required],
      genre: [''],
      poster: ['', Validators.required],
      year: ['', Validators.required],
      runtime: ['', [Validators.required]],
      tags: [[]],
      status: [
        '',
        [Validators.required, inArrayValidator(this.filmStatusList)],
      ],
      rating: [1, [Validators.min(1), Validators.max(5)]],
      quotesForm: this.fb.group({
        quotes: this.fb.array([]),
      }),
    });
    // ALBUM
    this.albumForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      genre: [''],
      cover: ['', Validators.required],
      reviewForm: this.fb.group({
        reviewer: [""],
        review: [""]
      }),
      year: ['', Validators.required],
      tags: [[]],
      rating: [1, [Validators.min(1), Validators.max(5)]],
      trackForm: this.fb.group({
        tracks: this.fb.array([]),
      }),
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
