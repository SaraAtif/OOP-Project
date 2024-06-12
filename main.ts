import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    name: string
    constructor(n: string) {
        this.name = n
    }
};
class Person {
    students: Student[] = []

    addstudents(obj: Student) {
        this.students.push(obj)
    }
};
const persons = new Person();

const programStart = async (persons: Person) => {

    do {
        console.log(chalk.blue.bold("\n Welcome"));
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Whom would you like to interact with: ",
            choices: ["staff member", "student", "Exit"]
        });

        if (ans.select == "staff member") {
            console.log("\n You approach the staff member. Please feel free to ask any question.\n")
        }
        else if (ans.select == "student") {
            let answer = await inquirer.prompt({
                name: "student",
                type: "input",
                message: "Please Enter the student name: "
            });
            const student = persons.students.find(val => val.name == answer.student);
            if (!student) {
                const name = new Student(answer.student);
                persons.addstudents(name)
                console.log(`\n Hello, i am ${name.name}. nice to meet you!`)
                console.log(persons.students);
            }
            else if (student) {
                console.log(`\n Hello, i am ${student.name}. nice to see you again!.`)
                console.log(persons.students);
            }
        }
        else if (ans.select == "Exit") {
            console.log(chalk.red.bold("Exiting the program..."))
            process.exit()
        }
    }
    while (true);
};
programStart(persons);
