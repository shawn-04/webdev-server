import { v4 as uuidv4 } from "uuid";
export default function AssignmentsDao(db) {
  const findAssignmentsForCourse = (courseId) =>
    db.assignments.filter((assignment) => assignment.course === courseId);
  const findAssignmentById = (assignmentId) =>
    db.assignments.find((assignment) => assignment._id === assignmentId);
  const createAssignment = (assignment) => {
    const created = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, created];
    return created;
  };
  const updateAssignment = (assignmentId, updates) => {
    const assignment = db.assignments.find((item) => item._id === assignmentId);
    if (!assignment) return null;
    Object.assign(assignment, updates, { _id: assignmentId });
    return assignment;
  };
  const deleteAssignment = (assignmentId) => {
    db.assignments = db.assignments.filter((item) => item._id !== assignmentId);
  };
  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
