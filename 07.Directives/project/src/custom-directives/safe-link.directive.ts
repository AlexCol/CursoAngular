import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]', // This directive can be applied to anchor tags (<a>) with the attribute 'appSafeLink'
  // standalone: true, // This directive is standalone and does not require a module (not necessary on newer Angular versions)
  host: {
    '(click)': 'onConfirmLeavePage($event)', // Listen for click events on the host element and call the onConfirmLeavePage method
  },
})
export class SafeLinkDirective {
  // forma de ter acesso ao proprio elemento dentro da classe
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef); // Inject the ElementRef to access the host element (anchor tag)

  //queryParam = input(''); // This input property allows passing a query parameter to the directive
  queryParam = input('', { alias: 'appSafeLink' }); // This input property allows passing a query parameter to the directive with an alias 'appSafeLink'

  constructor() {
    console.log('SafeLinkDirective initialized');
  }

  onConfirmLeavePage(event: PointerEvent): void {
    //console.log(event); //(para confirmar o tipo do evento)

    const wantsToLeave = window.confirm('Are you sure you want to leave this page?');
    console.log('User confirmed leaving the page:', wantsToLeave);

    if (!wantsToLeave) {
      event.preventDefault(); // Prevent the default action (navigation) if the user does not want to leave
      return;
    }

    //! If the user confirms, we can modify the href attribute to include a query parameter
    console.log(this.queryParam());
    if (this.queryParam()) {
      const compRef = event.currentTarget as HTMLAnchorElement; // Get the reference to the clicked anchor tag
      const address = compRef.href; // Get the href attribute of the clicked anchor tag
      const queryParam = `?from=${this.queryParam()}`;
      compRef.href = address + queryParam; // Append the query parameter to the href attribute
    }
  }
}
