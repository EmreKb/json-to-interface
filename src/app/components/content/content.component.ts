import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JsonToInterfaceService } from 'src/app/services/json-to-interface.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef = {} as ElementRef;
  @ViewChild('result') result: ElementRef = {} as ElementRef;
  onResult = false;
  onError = false;

  constructor(private jsonToInterfaceService: JsonToInterfaceService) {}

  ngOnInit(): void {}

  convert() {
    try {
      const value = this.textarea.nativeElement.value;
      const result = this.jsonToInterfaceService.convert(value);
      this.onResult = true;
      this.onError = false;
      this.result.nativeElement.value = result;
      window.scrollTo(0, document.body.scrollHeight);
    } catch {
      this.onError = true;
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.result.nativeElement.value);
  }
}
