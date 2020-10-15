export const FormFields = {
  basicInfo: [
    {
      name: "firstName",
      id: "firstName",
      label: "First Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "middleName",
      id: "middleName",
      label: "Middle Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "lastName",
      id: "lastName",
      label: "Last Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "dob",
      id: "dob",
      label: "",
      baseType: "input",
      type: "date",
      options: []
    },
    {
      name: "socialSecurity",
      id: "socialSecurity",
      label: "Social Security",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "nickName",
      id: "nickName",
      label: "Nick Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "aboutUs",
      id: "aboutUs",
      label: "How did you hear about us?",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "gender",
      id: "gender",
      label: "Gender",
      baseType: "select",
      type: null,
      options: [
        {
          label: "Male",
          value: "male"
        },
        {
          label: "Female",
          value: "female"
        }
      ]
    }
  ],
  addressDetails: [
    {
      name: "address",
      id: "address",
      label: "Address",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "address2",
      id: "address2",
      label: "Address 2",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "city",
      id: "city",
      label: "City",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "zip",
      id: "zip",
      label: "Zip/Postal",
      baseType: "input",
      type: "text",
      options: []
    }
  ],
  contactInfo: [
    {
      name: "phone_home",
      id: "phone_home",
      label: "Home Phone",
      baseType: "input",
      type: "number",
      options: []
    },
    {
      name: "phone_cell",
      id: "phone_cell",
      label: "Cell Phone",
      baseType: "input",
      type: "number",
      options: []
    },
    {
      name: "phone_work",
      id: "phone_work",
      label: "Work Phone",
      baseType: "input",
      type: "number",
      options: []
    },
    {
      name: "email",
      id: "email",
      label: "Email",
      baseType: "input",
      type: "email",
      options: []
    },
    {
      name: "ssn",
      id: "ssn",
      label: "SNN",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "contactPreference",
      id: "contactPreference",
      label: "Contact Preference",
      baseType: "select",
      type: null,
      options: [
        {
          label: "Mobile Phone",
          value: "mobile"
        },
        {
          label: "Home Phone",
          value: "home"
        },
        {
          label: "Work Phone",
          value: "work"
        }
      ]
    }
  ],
  emergencyInfo: [
    {
      name: "emergencyfirstName",
      id: "emergencyfirstName",
      label: "First Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "emergencymiddleName",
      id: "emergencymiddleName",
      label: "Middle Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "emergencylastName",
      id: "emergencylastName",
      label: "Last Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "relationship",
      id: "relationship",
      label: "Relationship",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "emergency_email",
      id: "emergencyemail",
      label: "Email",
      baseType: "input",
      type: "email",
      options: []
    },
    {
      name: "emergencycontact",
      id: "emergencycontact",
      label: "Contact Number",
      baseType: "input",
      type: "number",
      options: []
    }
  ],
  insuranceInfo: [
    {
      name: "planName",
      id: "planName",
      label: "Plan Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "groupNumber",
      id: "groupNumber",
      label: "Group Number",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "memberId",
      id: "memberId",
      label: "Member Id",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "insuranceType",
      id: "insuranceType",
      label: "Insurance Type",
      baseType: "input",
      type: "text",
      options: []
    }
  ],
  medicalInfo: [
    {
      name: "height",
      id: "height",
      label: "Height in (INCHES)",
      baseType: "input",
      type: "number",
      options: []
    },
    {
      name: "weight",
      id: "weight",
      label: "Weight in (POUNDS)",
      baseType: "input",
      type: "number",
      options: []
    },
    {
      name: "reasonForConsult",
      id: "reasonForConsult",
      label: "Reason For Consult",
      baseType: "input",
      type: "number",
      options: []
    }
  ],
  userNamePasswordDetails: [
    {
      name: "userName",
      id: "userName",
      label: "Username",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "password",
      id: "password",
      label: "Password",
      baseType: "input",
      type: "password",
      options: []
    },
    {
      name: "confirmPassword",
      id: "confirmPassword",
      label: "Confirm Password",
      baseType: "input",
      type: "password",
      options: []
    }
  ]
};
