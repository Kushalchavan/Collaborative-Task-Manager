import { mailer } from "../config/mailer";

type AssignmentEmailParams = {
  to: string;
  taskTitle: string;
  assignedBy: string;
};

export const sendTaskAssignmentEmail = async ({
  to,
  taskTitle,
  assignedBy,
}: AssignmentEmailParams) => {
  await mailer.sendMail({
    from: `"TaskFlow" <${process.env.SMTP_USER}>`,
    to,
    subject: "New Task Assigned to you",
    html: `
            <h2>You have a new task</h2>
            <p><strong>${assignedBy}</strong> assigned you  a task</p>
            <p><strong>Task Title : ${taskTitle}</strong></p>
                `,
  });
};
