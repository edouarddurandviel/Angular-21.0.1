import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Button } from '../../shared/components/button/button.component';
import { customsEvent } from '../../shared/directives/customsEvent';

@Component({
  selector: 'app-header',
  imports: [Button, NgStyle, customsEvent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  inlineStyle: Record<string, string> = {};
  loaded: boolean = true;
  tags: Array<string> = ['@angular', '@ngrx', 'Signals'];

  setCurrentStyles() {
    this.inlineStyle = {
      'font-style': 'normal',
      'font-weight': 'normal',
      'font-size': '12px',
    };
  }

  getAlertContent(message: string) {
    alert(message);
  }

  getDataObject(message: any) {
    console.log(message);
  }
}
