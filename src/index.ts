class Human {
  public name: string
  public age: number
  public gender: string
  constructor(name: string, age: number, gender: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }
}

const anton = new Human("Антон", 28, "мужчина")

const sayHi = (person: Human): void => {
  console.log(`Привет, ${person.name}. Тебе ${person.age} лет и ты ${person.gender}.`)
}

sayHi(anton)

export {}
