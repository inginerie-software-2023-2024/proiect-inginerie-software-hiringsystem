# Project Summary
The description of the project, including what can be done and what could be improved.

## Purpose

A full stack application that handles the hiring system of a company, in a way that automates trivial tasks and provides helpful tools for managers and interviewers. It should offer job applications handling as well as interviewing scheduling and room hosting.

## What it can do so far
Features that the application offers:

### Accounts & User Types

User Types:

- **Anonymous User** - a website navigator, that can see the jobs and their description, but can't interact with them
- **Candidate** - a newly registered user (interviewers and managers can't register, they have to be manually added via other means). 
- **Interviewer** - a user with special permissions for job application & interview manipulation
- **Manager** - same permissions as interviewer, to which we add the ability to create candidate accounts (for testing purposes) and job CRUD

Profiles:
  - **Manager/Interviewer Profile** - minimum information, their profiles can be seen only by themselves or managers.
  - **Candidate Profile** - offers CRUD for personal information and CV related information (such as projects, academic background, work experience). Although their profile can only be seen by managers and themselves, the job applications list will provide an artificially built CV based on their profile information.

### Job & Job Applications

 - **CRUD for jobs** - via a manager account
 - **Applying to jobs** - candidates can apply to jobs with a simple click.
 - **Job applications handling** via a manager/interviewer account. For a specific job you can view the applicants, a CV built from their profile. You can also accept/reject the application which will also **email the candidate** the according response.


### Interview Scheduling & Rooms
 - **Interview rooms** - If the application is accepted, a new button will appear for that candidate that allows the manager/interviewer create an interview room.
 - **Interview slots** - The interviewer has the ability to setup via a calendar some slots that they are available for interviews. 
 - **Interview scheduling** - The slots mentioned above are later used, when the candidate that has been selected for an interview can choose a slot from the interviewer's available slot list.
 - **Interview chat** - The interview room offers a chat for text messages that can be used to communicate. The chats are not saved afterwards and can only be viewed by the interview room members that are in the meeting.
 - **File sharing** - The chat mentioned above also provides a functionality for file sharing. Unlike text messages, these files are stored inside the database and can be accessed by other people based on their id.
 - **Interview video & audio** - Via peer to peer connection, a meeting is established.
 - **Interview room moderating** - Room moderators (interviewers) can mute/turn off camera of online members. They can also kick people out of the meeting, and close the interview room for everyone.

# To Improve

The project could benefit of the following updates in the future:
 - **More responsiveness** - although the application has some responsive pages, it has not been implemented enough.
 - **More testing** - there are not enough testing suites, we included two suites only for showing their functionality.
 - **Better RPA integration** - at the moment the RPA testing process need to be executed manually. In the future they might be automated through frameworks/docker integration.
 - **CI/CD pipeline** - Make a more complex and automated deployment.
 - **More Typescript type definitions** - We feel like the code could use a little more type definitions instead of anonymous declarations or the usage of the type any. 
 - **Contribution guides** - Generalize and create conventions for contributing to the project