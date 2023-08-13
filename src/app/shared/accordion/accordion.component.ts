import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements AfterViewInit {
  @ViewChildren('accordianHead') accordianHeadElements!: QueryList<ElementRef>;

  @Input() title!: string;

  @Input() description!: string;

  ngAfterViewInit(): void {
    this.accordianHeadElements.forEach((item: ElementRef) => {
      item.nativeElement.addEventListener('click', () => {
        this.closeAllAccordian(item.nativeElement);
      });
    });
  }

  closeAllAccordian(currentTarget: HTMLElement): void {
    this.accordianHeadElements.forEach((item: ElementRef) => {
      if (currentTarget !== item.nativeElement) {
        const accordianBody = item.nativeElement.nextElementSibling;
        const togglerButton = item.nativeElement.firstElementChild;
        togglerButton.classList.remove('active');
        accordianBody.classList.remove('active_body');
      } else {
        const accordianBody = currentTarget.nextElementSibling;
        const togglerButton = item.nativeElement.firstElementChild;
        togglerButton.classList.toggle('active');
        accordianBody?.classList.toggle('active_body');
      }
    });
  }
}
