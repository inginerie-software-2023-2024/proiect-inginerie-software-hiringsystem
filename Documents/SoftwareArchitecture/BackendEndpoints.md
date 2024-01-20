# Authentication Controller

This Spring Boot controller handles authentication-related endpoints for user registration, login, and password management.

## Endpoints

### 1. Register User

- **Endpoint:** `/api/v1/auth/register`
- **Method:** POST
- **Description:** Registers a new user.
- **Request Body:** Expects a JSON payload containing user registration details.

### 2. Confirm User Registration

- **Endpoint:** `/api/v1/auth/register/confirm/{token}`
- **Method:** POST
- **Description:** Confirms user registration using a unique token.
- **Path Variable:**
  - `token` - Unique token associated with the user registration.

### 3. Authenticate User

- **Endpoint:** `/api/v1/auth/authenticate`
- **Method:** POST
- **Description:** Authenticates a user and returns access and refresh tokens.
- **Request Body:** Expects a JSON payload containing authentication details.
- **Response:** Returns an authentication response containing access and refresh tokens as well as sets HTTP-only cookies.

### 4. Refresh Access Token

- **Endpoint:** `/api/v1/auth/refresh-token`
- **Method:** POST
- **Description:** Refreshes the access token using the refresh token.
- **Request:** Expects the request to contain a valid refresh token.
- **Response:** Updates the response with new access and refresh tokens.

### 5. Forgot Password

- **Endpoint:** `/api/v1/auth/forgot/password`
- **Method:** POST
- **Description:** Initiates the password reset process by sending an email to the user.
- **Request Body:** Expects a JSON payload containing the user's email address.

### 6. Reset Password

- **Endpoint:** `/api/v1/auth/reset/password/{token}`
- **Method:** POST
- **Description:** Resets the user's password using a unique token.
- **Path Variable:**
  - `token` - Unique token associated with the password reset.
- **Request Body:** Expects a JSON payload containing the new password.

## Dependencies

- **AuthenticationService:** The controller relies on the `AuthenticationService` for handling authentication-related business logic.


# User Controller

This Spring Boot controller manages user-related endpoints for user information retrieval and password management.

## Endpoints

### 1. Get User ID by Email

- **Endpoint:** `/api/v1/user/id/{mail}`
- **Method:** GET
- **Description:** Retrieves the user ID associated with the given email.
- **Path Variable:**
  - `mail` - User email address.
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 2. Get Short User Details by Email

- **Endpoint:** `/api/v1/user/details/{email}/short`
- **Method:** GET
- **Description:** Retrieves short user details (first name, last name, ID, and type) by email.
- **Path Variable:**
  - `email` - User email address.
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 3. Check if Email is Used

- **Endpoint:** `/api/v1/user/{mail}`
- **Method:** GET
- **Description:** Checks if the given email address is already in use.
- **Path Variable:**
  - `mail` - User email address.

### 4. Get Logged-In User

- **Endpoint:** `/api/v1/user/getLoggedIn`
- **Method:** GET
- **Description:** Retrieves details of the currently logged-in user.
- **Authorization:** Requires authentication.

### 5. Change User Password

- **Endpoint:** `/api/v1/user/change/password`
- **Method:** POST
- **Description:** Changes the password for the currently authenticated user.
- **Authorization:** Requires authentication.
- **Request Body:** Expects a JSON payload containing the old and new passwords.

## Dependencies

- **UserService:** Provides user-related business logic.

# Candidate Users Controller

This Spring Boot controller manages endpoints related to candidate users, including profile management and CV updates.

## Endpoints

### 1. Delete Candidate User

- **Endpoint:** `/api/v1/candidate/delete/{id}`
- **Method:** POST
- **Description:** Deletes a candidate user by ID.
- **Path Variable:**
  - `id` - Candidate user ID.
- **Authorization:** Requires 'MANAGER' authority.

### 2. Get All Candidate Users Paginated

- **Endpoint:** `/api/v1/candidate/get/all/paginated`
- **Method:** GET
- **Description:** Retrieves all candidate users in a paginated manner.
- **Query Parameters:**
  - `page` - Page number (default: 1)
  - `size` - Page size.
- **Authorization:** Requires 'MANAGER' authority.

### 3. Get Number of Pages

- **Endpoint:** `/api/v1/candidate/get/pages`
- **Method:** GET
- **Description:** Retrieves the number of pages for paginated results.
- **Query Parameter:**
  - `size` - Page size.

### 4. Get Candidate User

- **Endpoint:** `/api/v1/candidate/profile/{id}`
- **Method:** GET
- **Description:** Retrieves the details of a candidate user by ID.
- **Path Variable:**
  - `id` - Candidate user ID (or "me" for the authenticated user).
- **Authorization:** Requires authentication.
- **Note:** Managers can view any candidate's profile, while candidates can only view their own profile.

### 5. Get Candidate User CV

- **Endpoint:** `/api/v1/candidate/get/cv/{id}`
- **Method:** GET
- **Description:** Retrieves the CV of a candidate user by ID.
- **Path Variable:**
  - `id` - Candidate user ID.
- **Authorization:** Requires authentication.
- **Note:** Candidates can only view their own CV.

### 6. Create Candidate User

- **Endpoint:** `/api/v1/candidate/create`
- **Method:** POST
- **Description:** Registers a new candidate user.
- **Authorization:** Requires 'MANAGER' authority.

### 7. Edit Candidate User

- **Endpoint:** `/api/v1/candidate/edit/{id}`
- **Method:** POST
- **Description:** Edits the details of a candidate user by ID.
- **Path Variable:**
  - `id` - Candidate user ID.
- **Authorization:** Requires 'CANDIDATE' authority.

### 8. Edit Candidate User CV

- **Endpoint:** `/api/v1/candidate/edit/cv/{id}`
- **Method:** POST
- **Description:** Edits the CV of a candidate user by ID.
- **Path Variable:**
  - `id` - Candidate user ID.
- **Authorization:** Requires 'CANDIDATE' authority.

### 9. Edit Candidate User Personal Details

- **Endpoint:** `/api/v1/candidate/profile/update/details/{id}`
- **Method:** POST
- **Description:** Edits the personal details of a candidate user by ID.
- **Path Variable:**
  - `id` - Candidate user ID.
- **Authorization:** Requires 'CANDIDATE' authority.

### 10. Edit Candidate User Academic Background

- **Endpoint:** `/api/v1/candidate/profile/update/academic/{id}`
- **Method:** POST
- **Description:** Edits the academic background of a candidate user by ID.
- **Path Variable:**
  - `id` - Candidate user ID.
- **Authorization:** Requires 'CANDIDATE' authority.

### 11. Edit Candidate User Work Experience

- **Endpoint:** `/api/v1/candidate/profile/update/work/{id}`
- **Method:** POST
- **Description:** Edits the work experience of a candidate user by ID.
- **Path Variable:**
  - `id` - Candidate user ID.
- **Authorization:** Requires 'CANDIDATE' authority.

### 12. Edit Candidate User Projects

- **Endpoint:** `/api/v1/candidate/profile/update/projects/{id}`
- **Method:** POST
- **Description:** Edits the projects of a candidate user by ID.
- **Path Variable:**
  - `id` - Candidate user ID.
- **Authorization:** Requires 'CANDIDATE' authority.

## Dependencies

- **CandidateUserService:** Provides candidate user-related business logic.


# Interviewer Users Controller

This Spring Boot controller manages endpoints related to interviewer users, including profile management and type retrieval.

## Endpoints

### 1. Get All Interviewer Users Paginated

- **Endpoint:** `/api/v1/interviewer/get/all/paginated`
- **Method:** GET
- **Description:** Retrieves all interviewer users in a paginated manner.
- **Query Parameters:**
  - `page` - Page number (default: 1)
  - `size` - Page size.
- **Authorization:** Requires 'MANAGER' authority.

### 2. Delete Interviewer User

- **Endpoint:** `/api/v1/interviewer/delete/{id}`
- **Method:** POST
- **Description:** Deletes an interviewer user by ID.
- **Path Variable:**
  - `id` - Interviewer user ID.
- **Authorization:** Requires 'MANAGER' authority.

### 3. Get Interviewer User

- **Endpoint:** `/api/v1/interviewer/profile/{id}`
- **Method:** GET
- **Description:** Retrieves the details of an interviewer user by ID.
- **Path Variable:**
  - `id` - Interviewer user ID (or "me" for the authenticated user).
- **Authorization:** Requires authentication.
- **Note:** Managers can view any interviewer's profile, while interviewers can only view their own profile.

### 4. Create Interviewer User

- **Endpoint:** `/api/v1/interviewer/create`
- **Method:** POST
- **Description:** Registers a new interviewer user.
- **Authorization:** Requires 'MANAGER' authority.

### 5. Get All Interviewer Types

- **Endpoint:** `/api/v1/interviewer/types`
- **Method:** GET
- **Description:** Retrieves all available interviewer types.

## Dependencies

- **InterviewerUserService:** Provides interviewer user-related business logic.


# Manager Users Controller

This Spring Boot controller manages endpoints related to manager users, including profile management and user creation.

## Endpoints

### 1. Get Manager User

- **Endpoint:** `/api/v1/manager/profile/{id}`
- **Method:** GET
- **Description:** Retrieves the details of a manager user by ID.
- **Path Variable:**
  - `id` - Manager user ID (or "me" for the authenticated user).
- **Authorization:** Requires 'MANAGER' authority.
- **Note:** Managers can view their own profile or profiles of other managers.

### 2. Create Manager User

- **Endpoint:** `/api/v1/manager/create`
- **Method:** POST
- **Description:** Registers a new manager user.
- **Authorization:** Requires 'MANAGER' authority.

### 3. Create Candidate User

- **Endpoint:** `/api/v1/manager/create/candidate`
- **Method:** POST
- **Description:** Registers a new candidate user.
- **Authorization:** Requires 'MANAGER' authority.

### 4. Create Interviewer User

- **Endpoint:** `/api/v1/manager/create/interviewer`
- **Method:** POST
- **Description:** Registers a new interviewer user.
- **Authorization:** Requires 'MANAGER' authority.

## Dependencies

- **ManagerUserService:** Provides manager user-related business logic.

# Interview File Uploaded Controller

This Spring Boot controller manages endpoints related to the upload and download of interview files.

## Endpoints

### 1. Upload File

- **Endpoint:** `/api/v1/interview/files/upload/{roomId}/{userId}`
- **Method:** POST
- **Description:** Uploads a file for a specific interview room and user.
- **Path Variables:**
  - `roomId` - Interview room ID.
  - `userId` - User ID.
- **Request Parameter:**
  - `file` - The file to be uploaded.
- **Authorization:** Requires authentication.

### 2. Download File

- **Endpoint:** `/api/v1/interview/files/download/{fileId}`
- **Method:** GET
- **Description:** Downloads a previously uploaded file by its ID.
- **Path Variable:**
  - `fileId` - File ID.
- **Authorization:** Requires authentication.
- **Note:** If the file is not found, a 404 Not Found status is returned.

## Dependencies

- **InterviewFileUploadedService:** Manages the upload and download of interview files.

# Interview Room Controller

This Spring Boot controller manages endpoints related to interview rooms, including room creation, retrieval, modification, and deletion.

## Endpoints

### 1. Create Interview Room

- **Endpoint:** `/api/v1/interview/create`
- **Method:** POST
- **Description:** Creates a new interview room.
- **Request Body:** InterviewConferenceRoomDto
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.
- **Note:** Participants receive an email notification upon room creation.

### 2. Get All Interview Rooms

- **Endpoint:** `/api/v1/interview/get/all`
- **Method:** GET
- **Description:** Retrieves all interview rooms.
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 3. Get Interview Room

- **Endpoint:** `/api/v1/interview/get/{id}`
- **Method:** GET
- **Description:** Retrieves the details of an interview room by ID.
- **Path Variable:**
  - `id` - Interview room ID.
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 4. Edit Interview Room

- **Endpoint:** `/api/v1/interview/edit/{id}`
- **Method:** POST
- **Description:** Edits the details of an existing interview room.
- **Path Variable:**
  - `id` - Interview room ID.
- **Request Body:** InterviewConferenceRoomDto
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 5. Delete Interview Room

- **Endpoint:** `/api/v1/interview/delete/{id}`
- **Method:** POST
- **Description:** Deletes an interview room by ID.
- **Path Variable:**
  - `id` - Interview room ID.
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 6. Get Participant Info

- **Endpoint:** `/api/v1/interview/getParticipantInfo/{roomId}`
- **Method:** POST
- **Description:** Retrieves extra information about a participant in an interview room.
- **Path Variable:**
  - `roomId` - Interview room ID.
- **Authorization:** Requires authentication.

### 7. Get Until Start

- **Endpoint:** `/api/v1/interview/getUntilStart/{roomId}`
- **Method:** GET
- **Description:** Retrieves the time until the interview room starts.
- **Path Variable:**
  - `roomId` - Interview room ID.
- **Authorization:** Requires authentication.

### 8. Close Room

- **Endpoint:** `/api/v1/interview/closeRoom/{roomId}`
- **Method:** POST
- **Description:** Closes an interview room.
- **Path Variable:**
  - `roomId` - Interview room ID.
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 9. Force Action

- **Endpoint:** `/api/v1/interview/forceAction/{roomId}/{userId}`
- **Method:** POST
- **Description:** Forces an action in an interview room for a specific user.
- **Path Variables:**
  - `roomId` - Interview room ID.
  - `userId` - User ID.
- **Request Body:** InterviewForceAction
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 10. Get My Interview Rooms

- **Endpoint:** `/api/v1/interview/get/all/my`
- **Method:** GET
- **Description:** Retrieves all interview rooms associated with the authenticated user.
- **Authorization:** Requires authentication.

## Dependencies

- **InterviewConferenceRoomService:** Manages interview room-related business logic.
- **InterviewManagerService:** Manages interview room scheduling and actions.
- **SimpMessagingTemplate:** Facilitates WebSocket communication.
- **EmailSenderService:** Sends email notifications.
- **UserService:** Provides user-related information.

# Interview Slot Controller

This Spring Boot controller manages endpoints related to interview slots, including slot creation, deletion, and retrieval.

## Endpoints

### 1. Create Interview Slot

- **Endpoint:** `/api/v1/slot/create`
- **Method:** POST
- **Description:** Creates a new interview slot.
- **Request Body:** InterviewSlotDto
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.
- **Note:** Checks for slot overlap before creation.

### 2. Delete Interview Slot

- **Endpoint:** `/api/v1/slot/delete/{id}`
- **Method:** POST
- **Description:** Deletes an interview slot by ID.
- **Path Variable:**
  - `id` - Interview slot ID.
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 3. Get Available Interview Slots By Room Id

- **Endpoint:** `/api/v1/slot/available/room/{id}`
- **Method:** GET
- **Description:** Retrieves available interview slots for a specific room.
- **Path Variable:**
  - `id` - Interview room ID.
- **Authorization:** Requires authentication.

### 4. Get Interview Slots By User Id

- **Endpoint:** `/api/v1/slot/get/user/{id}`
- **Method:** GET
- **Description:** Retrieves interview slots for a specific user.
- **Path Variable:**
  - `id` - User ID.
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 5. Schedule Interview Slot

- **Endpoint:** `/api/v1/slot/schedule/{slotId}/{roomId}`
- **Method:** POST
- **Description:** Schedules an interview slot by assigning it to a room.
- **Path Variables:**
  - `slotId` - Interview slot ID.
  - `roomId` - Interview room ID.
- **Authorization:** Requires 'CANDIDATE' authority.

## Dependencies

- **InterviewSlotService:** Manages interview slot-related business logic.
- **InterviewConferenceRoomService:** Manages interview room-related business logic.

# Job Applications Controller

This Spring Boot controller manages endpoints related to job applications, including application creation, deletion, and retrieval.

## Endpoints

### 1. Erase Job Application

- **Endpoint:** `/api/v1/application/erase`
- **Method:** POST
- **Description:** Erases a job application by ID. Sends an email notification to the applicant.
- **Request Parameter:**
  - `id` - Job application ID.
- **Authorization:** Requires 'MANAGER' or 'INTERVIEWER' authority.

### 2. Withdraw Job Application

- **Endpoint:** `/api/v1/application/withdraw`
- **Method:** POST
- **Description:** Withdraws a job application by ID if the status is not 'REJECTED' or 'ACCEPTED'.
- **Request Parameter:**
  - `id` - Job application ID.
- **Authorization:** Requires 'CANDIDATE' authority.

### 3. Check If Already Applied

- **Endpoint:** `/api/v1/application/check/{id}`
- **Method:** GET
- **Description:** Checks if the authenticated user has already applied for a job.
- **Path Variable:**
  - `id` - Job ID.
- **Authorization:** Requires authentication.

### 4. Apply To Job

- **Endpoint:** `/api/v1/application/apply/{id}`
- **Method:** POST
- **Description:** Applies to a job by creating a new job application. Sends an email notification to the applicant.
- **Path Variable:**
  - `id` - Job ID.
- **Authorization:** Requires 'CANDIDATE' authority.

### 5. Get All Job Applications By Job ID

- **Endpoint:** `/api/v1/application/get/all/{id}`
- **Method:** GET
- **Description:** Retrieves all job applications for a specific job.
- **Path Variable:**
  - `id` - Job ID.
- **Authorization:** Requires 'INTERVIEWER' or 'MANAGER' authority.

### 6. Get All Job Applications By Status

- **Endpoint:** `/api/v1/application/get/all/status/{status}`
- **Method:** GET
- **Description:** Retrieves all job applications by status.
- **Path Variable:**
  - `status` - Application status (e.g., 'PENDING', 'ACCEPTED', 'REJECTED').
- **Authorization:** Requires 'INTERVIEWER' or 'MANAGER' authority.

### 7. Get All Job Applications By User ID and Status

- **Endpoint:** `/api/v1/application/get/all/user/{userId}/status/{status}`
- **Method:** GET
- **Description:** Retrieves all job applications by user ID and status.
- **Path Variables:**
  - `userId` - User ID.
  - `status` - Application status (e.g., 'PENDING', 'ACCEPTED', 'REJECTED').
- **Authorization:** Requires 'INTERVIEWER' or 'MANAGER' authority.

### 8. Get All Job Applications By User ID

- **Endpoint:** `/api/v1/application/get/all/user/{userId}`
- **Method:** GET
- **Description:** Retrieves all job applications by user ID.
- **Path Variable:**
  - `userId` - User ID.
- **Authorization:** Requires 'INTERVIEWER' or 'MANAGER' authority.

### 9. Get My Job Applications

- **Endpoint:** `/api/v1/application/get/all/my`
- **Method:** GET
- **Description:** Retrieves all job applications for the authenticated user.
- **Authorization:** Requires 'CANDIDATE' authority.

### 10. Update Job Application Status

- **Endpoint:** `/api/v1/application/status/update/{status}/{id}`
- **Method:** POST
- **Description:** Updates the status of a job application and sends an email notification to the applicant.
- **Path Variables:**
  - `status` - New application status (e.g., 'ACCEPTED', 'REJECTED').
  - `id` - Job application ID.
- **Authorization:** Requires 'INTERVIEWER' or 'MANAGER' authority.

### 11. Get User By Application ID

- **Endpoint:** `/api/v1/application/get/{id}/user`
- **Method:** GET
- **Description:** Retrieves the user associated with a job application.
- **Path Variable:**
  - `id` - Job application ID.
- **Authorization:** Requires 'INTERVIEWER' or 'MANAGER' authority.

## Dependencies

- **JobApplicationService:** Manages job application-related business logic.
- **EmailSenderService:** Sends email notifications for various job application events.
- **CandidateUserService:** Manages candidate user-related business logic.
- **JobService:** Manages job-related business logic.

# Jobs Controller

This Spring Boot controller manages endpoints related to job operations, including job creation, retrieval, and deletion.

## Endpoints

### 1. Get Job by ID

- **Endpoint:** `/api/v1/job/get`
- **Method:** GET
- **Description:** Retrieves a job by ID.
- **Request Parameter:**
  - `id` - Job ID.

### 2. Get All Jobs

- **Endpoint:** `/api/v1/job/get/all`
- **Method:** GET
- **Description:** Retrieves all jobs.
- **Authorization:** No specific authority required.

### 3. Get All Jobs (Paginated)

- **Endpoint:** `/api/v1/job/get/all/paginated`
- **Method:** GET
- **Description:** Retrieves jobs in a paginated manner.
- **Request Parameters:**
  - `page` - Page number.
  - `size` - Number of items per page.

### 4. Get Jobs with Salary Above

- **Endpoint:** `/api/v1/job/get/all/salary/{salary}`
- **Method:** GET
- **Description:** Retrieves jobs with a salary above a specified amount.
- **Path Variable:**
  - `salary` - Minimum salary.

### 5. Get Jobs by Job Type

- **Endpoint:** `/api/v1/job/get/all/type/{type}`
- **Method:** GET
- **Description:** Retrieves jobs by job type.
- **Path Variable:**
  - `type` - Job type.

### 6. Create Job

- **Endpoint:** `/api/v1/job/create`
- **Method:** POST
- **Description:** Creates a new job.
- **Request Body:** JobDto (contains job details).
- **Authorization:** Requires 'MANAGER' authority.

### 7. Edit Job

- **Endpoint:** `/api/v1/job/edit`
- **Method:** POST
- **Description:** Edits an existing job.
- **Request Parameters:**
  - `id` - Job ID.
- **Request Body:** JobDto (contains updated job details).
- **Authorization:** Requires 'MANAGER' authority.

### 8. Delete Job

- **Endpoint:** `/api/v1/job/delete`
- **Method:** POST
- **Description:** Deletes a job by ID.
- **Request Parameter:**
  - `id` - Job ID.
- **Authorization:** Requires 'MANAGER' authority.

### 9. Get All Job Types

- **Endpoint:** `/api/v1/job/types`
- **Method:** GET
- **Description:** Retrieves all job types.
- **Authorization:** No specific authority required.

### 10. Get All Positions

- **Endpoint:** `/api/v1/job/positions`
- **Method:** GET
- **Description:** Retrieves all job positions.
- **Authorization:** No specific authority required.

## Dependencies

- **JobService:** Manages job-related business logic.





