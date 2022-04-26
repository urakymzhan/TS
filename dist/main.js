/**
 * @ Variables ----------
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// const a = "1";
// console.log("aa", a.foo());
var hello = "world";
// hello = "country"
var hello2 = "world";
// hello2 = "country" // no error
// hello2 = true      // has error (not same type)
/* Explicitly Specify */
var hello3 = "world";
// hello3 = []; // error
/**
 * @ Functions ----------
 */
// const getFullName = (name, surname) => {
//     return name + " " + surname;
// }
// getFullName(true, []) //  no error
var getFullName = function (name, surname) {
    return name + " " + surname;
};
// getFullName(true, []) // error
/**
 * @ Interfaces ----------
 */
var user = {
    name: "Dan",
    age: 30
};
var user3 = {
    name: "Jack",
    age: 30,
    getMessage: function () { return "Hello" + name; }
};
var user4 = {
    name: 'Rahman',
    getMessage: function () { return "Hello" + name; }
};
console.log(user4.name);
// const popularTags: string[] = ['dragon', 'coffee'];
var popularTags = ['dragon', 'coffee']; // nicer and easy to undertand
var dragonsTag = 'dragon';
var username = "alex";
var pageName = "1";
var errorMessage = null;
var user5 = null;
var someProp;
/**
 * @ void | undefined | null | any (never use :) | unknown ) ----------
 */
// void
var doSomething = function () {
    console.log('something');
    // return 2 // error
};
// any
// let boo: any = 'x';
// console.log(boo.foo()) // no error which sucks
// never
var doSomething2 = function () {
    throw "never";
};
// unknown (alternative to never)
var vAny = 10;
var vUnknown = 10;
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
var someElement = document.querySelector('.foo');
// console.log("someElement", (someElement as any).value ) // never do this
console.log("someElement", someElement.value); // provided HTMLInputElement above
someElement.addEventListener('blur', function (event) {
    var target = event.target;
    console.log("event", target.value);
});
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // get error
    // changeUnchangableName(): void {
    //     this.unchangeableName = "foo"
    // }
    User.prototype.getFullName = function () {
        return this.firstName + " " + this.lastName;
    };
    User.maxAge = 50;
    return User;
}());
var user6 = new User("Joe", "Doe");
console.log(user6.lastName); // public
// console.log(user6.firstName) // private
// console.log(user6.maxAge) // static no works
// console.log(User.maxAge) // static works
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.setEditor = function (editor) {
        this.editor = editor;
    };
    Admin.prototype.getEditor = function () {
        return this.editor;
    };
    return Admin;
}(User));
var admin = new Admin('Foo', 'Bar');
console.log(admin.lastName);
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
var addId = function (obj) {
    var id = Math.random().toString(16);
    return __assign(__assign({}, obj), { id: id });
};
var user7 = {
    name: 'Ray',
    data: {
        meta: 'foo'
    },
    meta: "bar"
};
var user8 = {
    name: 'Ray',
    data: ['foo', 'bar', 'baz']
};
// const result = addId<string>("foo"); // will work unless specify: extends object above
var result = addId(user);
console.log("result", result);
/**
 * @ Enums ----------
 */
// const statuses = {
//     noStarted: 0,
//     inProgress: 1,
//     done: 2
// }
// console.log(statuses.inProgress)
var StatusEnum;
(function (StatusEnum) {
    StatusEnum[StatusEnum["NotStarted"] = 0] = "NotStarted";
    StatusEnum[StatusEnum["InProgress"] = 1] = "InProgress";
    StatusEnum[StatusEnum["Done"] = 2] = "Done";
})(StatusEnum || (StatusEnum = {}));
// enum Status {
//     NotStarted = "NotStarted",
//     InProgress = "InProgress",
//     Done = "Done"
// }
console.log(StatusEnum.InProgress);
var notStartedStatus = StatusEnum.NotStarted;
// notStartedStatus = "foo"; // cant assign somethig else
// notStartedStatus = Status.Done; // cant assign somethig else
console.log(StatusEnum.InProgress);
