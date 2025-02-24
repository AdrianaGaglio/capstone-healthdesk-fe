import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '../buttons/buttons.module';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [NotesComponent, AddNoteComponent],
  imports: [CommonModule, FormsModule, ButtonsModule, NgIconsModule],
  exports: [NotesComponent, AddNoteComponent],
})
export class NotesModule {}
