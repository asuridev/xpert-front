import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FetchService } from '../services/fetch.service';
import { Breeds } from '../interfaces/breeds.interface';
import {MatTableModule} from '@angular/material/table';

interface DataSource {
  position:number;
  name: string;
  origen: string;
  weight: string;
  temperament: string;
}

@Component({
  selector: 'xpert-two',
  imports:[
    MatButtonModule, MatFormFieldModule, MatInputModule,ReactiveFormsModule,MatTableModule
  ],
  template: `
    <div class="text-center">
      <mat-form-field class="w-full">
        <input type="search" [formControl]="searchFormControl" matInput placeholder="Buscar" />
      </mat-form-field>
      <button [disabled]="!searchFormControl.valid" (click)="handleClick()" class="w-48" mat-stroked-button>Buscar</button>
    </div>
    @if(dataSource){
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

  <!-- Position Column -->
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.position}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef> Weight </th>
    <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="origen">
    <th mat-header-cell *matHeaderCellDef> Origen </th>
    <td mat-cell *matCellDef="let element"> {{element.origen}} </td>
  </ng-container>

   <ng-container matColumnDef="temperament">
    <th mat-header-cell *matHeaderCellDef> Temperamento </th>
    <td mat-cell *matCellDef="let element"> {{element.temperament}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
    }


  `,
})
export default class ViewTwo {
   public searchFormControl = new FormControl('', [Validators.required]);
   public dataSource:DataSource[] | null = null;
   public displayedColumns: string[] = ['position', 'name', 'weight', 'origen', 'temperament'];
   constructor(
      private readonly fetchService:FetchService
   ){}


   public async handleClick():Promise<void>{
     const breeds = await this.fetchService.getSearch(this.searchFormControl.value!);
      this.dataSource = breeds.map((breed, index) => ({
        position:index + 1,
        name: breed.name,
        origen: breed.origin,
        weight: breed.weight.metric + ' kg',
        temperament: breed.temperament,
      }))
      this.searchFormControl.reset();
   }
}
