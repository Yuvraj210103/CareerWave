import {
  IUserProfileCustomSections,
  IUserProfileEducationDetailsChildCollection,
  IUserProfilePersonalDetails,
  IUserProfileProjectsDetails,
  IUserProfileSkillsChildCollection,
  IUserProfileWorkExperienceChildCollection,
} from "../../@types/database";
import { formatDate } from "../misc";
import { TemplateArgs } from "./TemplateGenerate";

const template2 = ({ UserProfile }: TemplateArgs) => {
  const personalDetails = (personalDetails: IUserProfilePersonalDetails) => {
    const html = `<div>
      <div style="font-size:22px; font-weight:bold;">${
        personalDetails.UserFullName
      }</div>
      <p style="margin:5px 0;">${personalDetails.UserPhone} | <a href="mailto:${
      personalDetails.UserEmail
    }">${personalDetails.UserEmail}</a></p>
      <p>${personalDetails.UserAddress || ""}</p>
    </div>`;
    return html;
  };

  const summary = (summary: string | null) => {
    const html = `<div>
      <div style="font-size:20px; font-weight:600;">Professional Summary</div>
      <hr>
      <p>${summary || ""}</p>
    </div>`;
    return summary ? html : "";
  };

  const skills = (skills: IUserProfileSkillsChildCollection[]) => {
    const html = `<div>
      <div style="font-size:20px; font-weight:600;">Skills</div>
      <hr>
      <ul style="list-style-type:circle;">
        ${skills
          .map(
            (s) =>
              `<li>${s.UserSkillName} (Proficiency: ${s.UserSkillProficiency}/5)</li>`
          )
          .join("")}
      </ul>
    </div>`;
    return html;
  };

  const workExperience = (
    workExp: IUserProfileWorkExperienceChildCollection[]
  ) => {
    const html = `<div>
      <div style="font-size:20px; font-weight:600;">Work Experience</div>
      <hr>
      ${workExp
        .map(
          (res) => `<div style="margin-bottom:10px;">
            <div style="font-size:18px; font-weight:600;">${
              res.UserWorkExpJobTitle
            }</div>
            <div>${res.UserWorkExpCompanyName} | ${
            res.UserWorkExpLocation
          }</div>
            <div>${formatDate(res.UserWorkExpStartDate, "MM/YYYY")} - ${
            res.UserWorkExpEndDate
              ? formatDate(res.UserWorkExpEndDate, "MM/YYYY")
              : "Present"
          }</div>
            <p>${res.UserWorkExpDescription || ""}</p>
          </div>`
        )
        .join("")}
    </div>`;
    return html;
  };

  const projectDetails = (projects: IUserProfileProjectsDetails[]) => {
    const html = `<div>
      <div style="font-size:20px; font-weight:600;">Projects</div>
      <hr>
      ${projects
        .map(
          (project) => `<div style="margin-bottom:10px;">
            <div style="font-size:18px; font-weight:600;">${
              project.UserProjectTitle
            }</div>
            <p>${project.UserProjectDescription}</p>
            <p>Technologies Used: ${project.UserProjectTechnologies.join(
              ", "
            )}</p>
            ${
              project.UserProjectLink
                ? `<a href="${project.UserProjectLink}">${project.UserProjectLink}</a>`
                : ""
            }
          </div>`
        )
        .join("")}
    </div>`;
    return html;
  };

  const educationDetails = (
    education: IUserProfileEducationDetailsChildCollection[]
  ) => {
    const html = `<div>
      <div style="font-size:20px; font-weight:600;">Education</div>
      <hr>
      ${education
        .map(
          (edu) => `<div style="margin-bottom:10px;">
            <div style="font-size:18px; font-weight:600;">${
              edu.UserEducationDegree
            } - ${edu.UserEducationInstitution}</div>
            <div>${formatDate(
              edu.UserEducationStartDate,
              "MM/YYYY"
            )} - ${formatDate(edu.UserEducationEndDate, "MM/YYYY")}</div>
            <p>Grade: ${edu.UserEducationGrade || "N/A"}</p>
            <p>${edu.UserEducationDescription || ""}</p>
          </div>`
        )
        .join("")}
    </div>`;
    return html;
  };

  const usefulLinks = (personalDetails: IUserProfilePersonalDetails) => {
    const html = `<div>
      <div style="font-size:20px; font-weight:600;">Useful Links</div>
      <hr>
      <div>
        ${`<div><span style="font-weight:600">Portfolio: </span> <a href="${personalDetails.UserWebsite}" target="_blank">${personalDetails.UserWebsite}</a></div>`}
      </div><div>
        ${`<div><span style="font-weight:600">LinkedIn: </span> <a href="${personalDetails.UserLinkedIn}" target="_blank">${personalDetails.UserLinkedIn}</a></div>`}
      </div>
      <div>
        ${`<div><span style="font-weight:600">Github: </span> <a href="${personalDetails.UserGitHub}" target="_blank">${personalDetails.UserGitHub}</a></div>`}
      </div>
    </div>`;
    return html;
  };

  const customSections = (sections: IUserProfileCustomSections[]) => {
    const html = sections
      .map(
        (section) => `<div style="margin-top:10px;">
          <div style="font-size:20px; font-weight:600;">${section.UserProfileCustomSectionTitle}</div>
          <hr>
          <p>${section.UserProfileCustomSectionContent}</p>
        </div>`
      )
      .join("");
    return sections.length > 0 ? html : "";
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  ${personalDetails(UserProfile.UserProfilePersonalDetails)}
  ${summary(UserProfile.UserProfilePersonalDetails.UserSummary || null)}
  ${skills(UserProfile.UserProfileSkills)}
  ${workExperience(UserProfile.UserProfileWorkExperience)}
  ${projectDetails(UserProfile.UserProfileProjects)}
  ${educationDetails(UserProfile.UserProfileEducationDetails)}
  ${usefulLinks(UserProfile.UserProfilePersonalDetails)}
  ${customSections(UserProfile.UserProfileCustomSections || [])}
</body>
</html>`;

  return html;
};

export default template2;
