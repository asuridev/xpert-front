import { Component, effect, signal } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Breeds } from '../interfaces/breeds.interface';
import { environments } from '../environments/environments.dev';

@Component({
  selector: 'xpert-one',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  template: `
    <mat-form-field>
      <mat-label>Selected Breed</mat-label>
      <mat-select [(ngModel)]="selectedBreeds">
        @for (breed of breeds; track breed.id) {
        <mat-option [value]="breed.id">
          {{ breed.name }}
        </mat-option>
        }
      </mat-select>
    </mat-form-field>

    @if(selectedBreedsData){
    <div class="block md:flex">
      <div class="md:w-1/2">
        <img
          [src]="imageCatSelected"
          alt="cats of breeds"
          width="100%"
        />
      </div>
      <div class="ml-4 space-y-2 md:w-1/2">
        <div>
          <span class="font-bold mr-2">nombre:</span>
          <span>{{ selectedBreedsData.name }}</span>
        </div>
        <div>
          <span class="font-bold mr-2">peso:</span>
          <span>{{ selectedBreedsData.weight.metric }} Kg</span>
        </div>
        <div>
          <span class="font-bold mr-2">Pais de origen:</span>
          <span>{{selectedBreedsData.origin }}</span>
        </div>
         <div>
          <span class="font-bold mr-2">Descripcion:</span>
          <span>{{ selectedBreedsData.description }}</span>
        </div>
        <div>
          <span class="font-bold mr-2">temperamento:</span>
          <span>{{ selectedBreedsData.temperament }}</span>
        </div>
         <div>
          <span class="font-bold mr-2">mas informacion:</span>
          <a target="_blank" [href]="selectedBreedsData.wikipedia_url" class="hover:underline hover:cursor-pointer">
            {{ selectedBreedsData.wikipedia_url }}
          </a>
        </div>
      </div>
    </div>
    }
  `,
})
export default class ViewOne {
  public breeds: Breeds[] = [];
  public selectedBreeds = signal<string | null>(null);
  public selectedBreedsData: Breeds | null = null;
  public imageCatSelected:string |null = null;

  constructor(
    private readonly fetchService: FetchService
  ) {
    effect(async () => {
      if (this.selectedBreeds()) {
        this.selectedBreedsData = null;
        this.selectedBreedsData = await this.fetchService.getAllBreedById(this.selectedBreeds()!);
        this.imageCatSelected = environments.URL_IMAGES + this.selectedBreedsData?.reference_image_id + '.jpg';
      }
    });
  }

  async ngOnInit() {
    const data = await this.fetchService.getAllBreeds();
    this.breeds = data;
  }

}
