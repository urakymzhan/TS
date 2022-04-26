/**
 * @ Variables ----------
 */

// const a = "1";
// console.log("aa", a.foo());

const hello = "world";
// hello = "country"

let hello2 = "world";
// hello2 = "country" // no error
// hello2 = true      // has error (not same type)

/* Explicitly Specify */
let hello3: string = "world";
// hello3 = []; // error


/**
 * @ Functions ----------
 */

// const getFullName = (name, surname) => {
//     return name + " " + surname;
// }
// getFullName(true, []) //  no error

const getFullName = (name: string, surname: string): string => {
    return name + " " + surname;
}
// getFullName(true, []) // error


/**
 * @ Interfaces ----------
 */

const user: { name: string, age: number } = {
    name: "Dan",
    age: 30
}
// const user2: {name: string, age: number} = { // error
//     name: 'Joe'
// }

// let create interface and make it reusable
interface UserInterface {
    // all mandatory expect age
    name: string,
    age?: number,
    getMessage(): string
}

const user3: UserInterface = {
    name: "Jack",
    age: 30,
    getMessage() { return "Hello" + name }
}
const user4: UserInterface = { // error
    name: 'Rahman',
    getMessage() { return "Hello" + name }
}

console.log(user4.name)

/**
 * @ Union & Type alias ----------
 */

type ID = string;
type PopularTag = string;
type MaybePopularTag = PopularTag | null;

interface UserInterface2 {
    name: ID;
    surname: string;
}

// const popularTags: string[] = ['dragon', 'coffee'];
const popularTags: PopularTag[] = ['dragon', 'coffee']; // nicer and easy to undertand

const dragonsTag: MaybePopularTag = 'dragon';

let username: string = "alex";

let pageName: string | number = "1";

let errorMessage: string | null = null;

let user5: UserInterface2 | null = null;

let someProp: string | number | null | undefined | string[] | object

/**
 * @ void | undefined | null | any (never use :) | unknown ) ----------
 */

// void
const doSomething = (): void => {
    console.log('something');
    // return 2 // error
}

// any
// let boo: any = 'x';
// console.log(boo.foo()) // no error which sucks

// never
const doSomething2 = (): never => {
    throw "never"
}

// unknown (alternative to never)
let vAny: any = 10;
let vUnknown: unknown = 10;

// let s1: string = vAny; // no error (TS doesn't care)
// let s2: string = vUnknown; // error (TS doesn't know type)



/**
 * @ Working with DOM ----------
 * 
 * TS doesn't have access to markup 
 * We only use it to static analyzing our code 
 */

// let page: any = '1';
// let pageNumber = page as string; // type assertion

const someElement = document.querySelector('.foo') as HTMLInputElement;

// console.log("someElement", (someElement as any).value ) // never do this
console.log("someElement", someElement.value) // provided HTMLInputElement above

someElement.addEventListener('blur', (event) => {
    let target = event.target as HTMLInputElement;
    console.log("event", target.value)
})


/**
 * @ Classes ----------
 */

interface UserInterface3 {
    getFullName(): string
}
class User implements UserInterface3 {
    // by default public
    private firstName: string
    lastName: string
    readonly unchangeableName: string
    static readonly maxAge = 50

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // get error
    // changeUnchangableName(): void {
    //     this.unchangeableName = "foo"
    // }
    getFullName(): string {
        return this.firstName + " " + this.lastName
    }
}

const user6 = new User("Joe", "Doe");
console.log(user6.lastName) // public
// console.log(user6.firstName) // private
// console.log(user6.maxAge) // static no works
// console.log(User.maxAge) // static works


class Admin extends User {
    private editor: string

    setEditor(editor: string): void {
        this.editor = editor
    }
    getEditor(): string {
        return this.editor;
    }
}

const admin = new Admin('Foo', 'Bar');
console.log(admin.lastName)
// console.log(admin.firstName) // private error



/**
 * @ Generics ----------
 * 
 * All generics written inside <>
 */

// const addId = obj => {
//     let id = Math.random().toString(16);
//     return {
//         ...obj,
//         id,
//     }
// }

// const user7 = {
//     name: 'Ray'
// }

// const result = addId(user);
// console.log("result", result)

// step 1

// const addId = <T>(obj: T) => {
//     let id = Math.random().toString(16);
//     return {
//         ...obj,
//         id,
//     }
// }

// const user7 = {
//     name: 'Ray'
// }

// const result = addId(user);
// console.log("result", result)

// step 2
const addId = <T extends object>(obj: T) => {
    let id = Math.random().toString(16);
    return {
        ...obj,
        id,
    }
}

interface UserInterface4<T, V> {
    name: string;
    data: T;
    meta: V;
}
const user7: UserInterface4<{ meta: string }, string> = {
    name: 'Ray',
    data: {
        meta: 'foo'
    },
    meta: "bar"
}

const user8: UserInterface4<string[]> = {
    name: 'Ray',
    data: ['foo', 'bar', 'baz'],
}
// const result = addId<string>("foo"); // will work unless specify: extends object above
const result = addId<UserInterface4>(user);
console.log("result", result)



/**
 * @ Enums ----------
 */

// const statuses = {
//     noStarted: 0,
//     inProgress: 1,
//     done: 2
// }
// console.log(statuses.inProgress)

enum StatusEnum {
    NotStarted,
    InProgress,
    Done
}
// enum Status {
//     NotStarted = "NotStarted",
//     InProgress = "InProgress",
//     Done = "Done"
// }
console.log(StatusEnum.InProgress)

const notStartedStatus: StatusEnum = StatusEnum.NotStarted;

// notStartedStatus = "foo"; // cant assign somethig else
// notStartedStatus = Status.Done; // cant assign somethig else

console.log(StatusEnum.InProgress);


// Enums used in Interfaces
interface Task {
    id: string,
    status: StatusEnum; // only provide Status, nothing else
}
