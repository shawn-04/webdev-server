import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((enrollment) => enrollment.user === userId);
  }
  function findUsersForCourse(courseId) {
    const { users, enrollments } = db;
    return users.filter((user) =>
      enrollments.some((e) => e.user === user._id && e.course === courseId),
    );
  }
  function enrollUserInCourse(userId, courseId) {
    const exists = db.enrollments.some((e) => e.user === userId && e.course === courseId);
    if (exists) return;
    db.enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId),
    );
  }
  return { findEnrollmentsForUser, findUsersForCourse, enrollUserInCourse, unenrollUserFromCourse };
}
