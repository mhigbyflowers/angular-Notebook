import { Component, OnChanges, Input, Output, AfterViewInit ,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/interfaces/page';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnChanges, AfterViewInit{
  @ViewChild('note') textArea:ElementRef
  @Input() page: Page;
  @Output() update: EventEmitter<Page> = new EventEmitter();
  @Output() endOfPage: EventEmitter<any> = new EventEmitter();
  noteText = '';
  constructor(route: Router) {
  }

  ngOnChanges(): void {
    if (this.page) {
      this.noteText = this.page.value;
    } 
    
  }
  ngAfterViewInit(): void {
    
      
  }

  noteChange(note) {
    const rowsOfText = note.value.split(/\r\n|\r|\n/).length
    const maxRows = Math.floor(note.offsetHeight/24) - 6;
    if (maxRows <= rowsOfText){
      this.endOfPage.emit();
    }
    this.update.emit({
      pageId:this.page.pageId,
      value: note.value,
      focus:true
    })
  }


}
