import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlePipe',
  standalone: true,
})
export class CustomTitlePipe implements PipeTransform {
  transform(value: string): string {
    // Ajouter votre logique personnalisée ici
    return `This is a custom pipe to format the title var content : ${value}`;
  }
}
