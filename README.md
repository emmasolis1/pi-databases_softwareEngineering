# Project Databases-Software Engineering

## What I learned:
- Daily Stand Ups
- Project Management
- Scrum Master
- Sprint Planning, Retrospective, Reviews.

## Tools Used:
- C#
- CSS
- Figma (create the mock ups)
- HTML
- JavaScript
- Lucid (create the UML diagrams)
- Microsoft SQL Server
- .Net API
- ReactJS

## How to Run
1. For the API Backend open the solution from the _backend_ folder in Visual Studio.
2. For the Frontend navigate with the terminal to the folder _frontend_ and then first do `npm install`, and then `npm run dev`.

## Notes
In the folder _screenshots_ we can find a lot of screenshots of all the views of the project, so you can see the project. Our app was smart enoguht to detect if the user accessing the system was an employee or an employer and based on that made a **conditional redering**.

## Database Diagrams
![](sprint2/database_ER_diagrams.png)
![](sprint2/database_Tables_diagrams.png)

## Meaning of "UserType" values:
0: Active employer. <br />
1: Active employee. <br />
2: Inactive employer. <br />
3: Inactive employee.

## Meaning of "ContractType" values:
0: Full-time Employee. <br />
1: Half-time employee. <br />
2: Hourly employee. <br />
3: Professional services.

## Meaning of "HoursApprovalStatus" values:
0: Pending approval. <br />
1: Approved. <br />
2: Denied.
