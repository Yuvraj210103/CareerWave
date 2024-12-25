import {
  IUserProfilePersonalDetails,
  IUserProfileSkillsChildCollection,
  IUserProfileWorkExperienceChildCollection,
} from "../../@types/database";
import { formatDate } from "../misc";
import { TemplateArgs } from "./TemplateGenerate";

const template1 = ({ UserProfile }: TemplateArgs) => {
  const personalDetails = (personalDetails: IUserProfilePersonalDetails) => {
    const html = `<div><h3>${personalDetails.UserFullName}</h3>
    <hr>
    <p>${personalDetails?.UserPhone || ""}  <a href="mailto:${
      personalDetails?.UserEmail || ""
    }">| ${personalDetails?.UserEmail || ""}</a> | ${
      personalDetails?.UserAddress || "" || ""
    }</p></div>`;
    return html;
  };

  const summary = (summary: string | null) => {
    const html = `
    <div>
        <h3>Summary</h3>
        <hr>
        <p>
          ${summary}
        </p>
    </div>`;

    return summary ? html : "";
  };

  const skills = (skills: IUserProfileSkillsChildCollection[]) => {
    const html = `<div>
        <h3>Technical Skills</h3>
        <hr>
        <p>${skills.map((s) => s.UserSkillName).join(" , ")}</p>
    </div>`;

    return html;
  };

  const workExperience = (
    workExp: IUserProfileWorkExperienceChildCollection[]
  ) => {
    const html = ` <div>
        <h3>Relevant Experience</h3>
        <hr>
        ${workExp
          .map(
            (res) => `<p> <strong>${
              res.UserWorkExpCompanyName
            } | Bangalore, Maharashtra</strong><br>
        <strong>${res.UserWorkExpJobTitle} | ${formatDate(
              res.UserWorkExpStartDate,
              "MM/YYYY"
            )} - ${
              res.UserWorkExpEndDate
                ? formatDate(res.UserWorkExpEndDate, "MM/YYYY")
                : "Working"
            }</strong><br> I crafted Nearbuck's website and developed their core offerings – intuitive billing and accounting software.
        My role aimed at enhancing their digital footprint and delivering efficient solutions for seamless business
        operations.
        </p>`
          )
          .join("")}
        
    </div>`;

    return html;
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${UserProfile.UserProfilePersonalDetails.UserFullName}</title>
</head>
<body>
    ${personalDetails(UserProfile.UserProfilePersonalDetails)}

    ${summary(UserProfile.UserProfilePersonalDetails.UserSummary || null)}
    
    ${skills(UserProfile.UserProfileSkills)}

    ${workExperience(UserProfile.UserProfileWorkExperience)}
    <div>
        <h3>Relevant Experience</h3>
        <hr>
        <p> <strong>Nearbuck Technologies | Bangalore, Maharashtra</strong><br>
        <strong>Full Stack Developer | 12/2022 - 06/2024</strong><br> I crafted Nearbuck's website and developed their core offerings – intuitive billing and accounting software.
        My role aimed at enhancing their digital footprint and delivering efficient solutions for seamless business
        operations.
        </p>
    </div>
    <div>
        <h3>Projects</h3>
        <hr>
        <p><strong>Attendance Management System with Location-Based QR Verification:</strong><br>Developed a web application for efficient attendance tracking, featuring class, student, and faculty
            management. Implemented QR code-based attendance marking with location validation to ensure
            in-class presence, enabling secure, real-time session tracking for administrators and faculty.
            </p>
            <div>
                <p><strong>Cloud-based Notebook (MERN Stack):</strong><br>Developed a dynamic notebook application using the MERN stack, seamlessly integrating MongoDB,
                    Express, React.js, and Node.js. This project enables users to store and access notes securely in the
                    cloud, combining functionality with a sleek user interface.                    
                    </p>
            </div>
    </div>
    
        <div>
            <h3>Education</h3>
            <hr>
            <p> <strong>K.P.B Hinduja College | Mumbai, Maharashtra</strong><br>
            <strong>Bachelor of Computer Application | 08/2024</strong><br>I have graduated with a Bachelor's degree in Computer Applications (BCA), where I have acquired
            comprehensive knowledge in programming, software development, and IT essentials
            </p>
        </div>

        <div>
            <h3>Useful Links</h3>
            <hr>
            <span><strong>Portfolio website:</strong> <a href="https://yuvraj21.vercel.app"> https://yuvraj21.vercel.app</a></span><br><br>
            <span><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yuvraj-singh-972877222/"> https://www.linkedin.com/in/yuvraj-singh-972877222/</a></span><br><br>
            <span><strong>Github:</strong> <a href=" https://github.com/Yuvraj210103"> https://github.com/Yuvraj210103</a></span>
        </div>
    
    
</body>
</html>`;

  return html;
};

export default template1;
