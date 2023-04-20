# brightstudy
Management platform for university courses

## Initial proposal

### Features:
* Students:
  * Have access to different categories of courses which are added by their according professors, admins.
  * Get recommendations on what courses they should pick in the upcoming semesters.
  * Have access to an admin managed forum for engaging in discussions with other students on different topics such as course registration and class experience. (feature switch - some universities might not want this feature)
  * Have access to currently available transcript and acquired credit hours
  * ...
* Professors:
  * Can create a new course (needs to be approved by admin - head of department)
  * Can add, drop students from course
  * Can add/update/remove grades
  * ...
* Admins:
  * Can schedule registration timeslots by applying specific filters such as the student's academic year (e.g. seniors take precedence)
  * Can schedule the disaster recovery mechanisms to be applied more frequently - e.g. store a new DB copy every 10 minutes during registration period
  * Manage courses, professors and students
  * ...

### SSR or CSR
* [SSR](https://nextjs.org) with [Auth](https://authjs.dev)
  * better search engine indexing, faster first paint
* [CSR](https://react.dev) with [Auth](https://auth0.com/blog/complete-guide-to-react-user-authentication/)
  * less demand on server

