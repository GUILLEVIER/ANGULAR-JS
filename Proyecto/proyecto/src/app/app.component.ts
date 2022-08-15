import { Component, Directive, ElementRef, TemplateRef, ViewContainerRef, Input } from '@angular/core';

// Component is a Directive with a template
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // Definición de variables locales.
  gif = 'https://c.tenor.com/Bklo77mJokoAAAAC/tenor.gif'
  gifAlt = 'A gif'
  title = 'Proyecto de Guillermo Morales'


  person1 = { name: 'Catalina', favoriteColor: 'Red' }
  person2 = { name: 'Natalie', favoriteColor: 'Yellow' }

  persons: any[] = [{
    'name': 'Guillermo Morales',
    'rut': '18187922-K',
    'phone_number': '+56979330118',
    'date_of_birth': '27/06/1992',
    'marital_status': 'Soltero',
    'active': true
  }, {
    'name': 'Leontina Espinoza',
    'rut': '7743831-9',
    'phone_number': '+56931709490',
    'date_of_birth': '09/06/',
    'marital_status': 'Soltera',
    'active': false
  }]

  // Definición de variables privadas.
  private display: string = ''

  // Definición de métodos que utiliza la vista app.
  listStyle(person: any) {
    return { 'collection-item': true, 'red': !person.active, 'green': person.active }
  }

  cardStyle(display: string) {
    return { 'card': true, 'blue-grey': (display === this.display) }
  }

  setDisplay(display: string) {
    this.display = display
  }

  // Al presionar el botón de detalles, se muestra un mensaje.
  seeDetails(name: string) {
    alert(`${name}`)
  }

  // Métodos que modifican el nombre de la persona.
  changeNamePerson1(name: string) {
    this.person1.name = name
  }

  changeNamePerson2(name: string) {
    this.person2.name = name
  }

  // Métodos que modifican el color favorito de la persona.
  changeColorPerson1(color: string) {
    this.person1.favoriteColor = color
  }

  changeColorPerson2(color: string) {
    this.person2.favoriteColor = color
  }

  checkActivePersons() {
    let check = false
    this.persons.map((person => {
      if (person.active) {
        check = true
      }
    }))
    return check
  }
}

// Attribute Directive - Change the behavior of a component but don't affect the template
@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.textTransform = 'uppercase'
  }
}

// Structural Directive - Change the behavior by changing how the template is rendered
@Directive({
  selector: "[ifNot]"
})
export class IfNotDirective {
  private hasView: boolean = false
  constructor(private tempRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
  @Input() set ifNot(condition: string) {
    if (!condition && !this.hasView) {
      // Showing template
      this.viewContainer.createEmbeddedView(this.tempRef)
      this.hasView = true
    } else if (condition && this.hasView) {
      this.viewContainer.clear()
      this.hasView = false
    }
  }
}