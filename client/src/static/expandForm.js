export const FormFields = {
  basicInfo: [
    {
      name: "firstname",
      id: "firstname",
      label: "First Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "middlename",
      id: "middlename",
      label: "Middle Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "lastname",
      id: "lastname",
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
      name: "ssn",
      id: "ssn",
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
          value: "M"
        },
        {
          label: "Female",
          value: "F"
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
      name: "postal",
      id: "postal",
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
      name: "emergency_firstname",
      id: "emergency_firstname",
      label: "First Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "emergency_middlename",
      id: "emergency_middlename",
      label: "Middle Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "emergency_lastname",
      id: "emergency_lastname",
      label: "Last Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "emergency_relationship",
      id: "emergency_relationship",
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
      name: "emergency_phone",
      id: "emergency_phone",
      label: "Contact Number",
      baseType: "input",
      type: "number",
      options: []
    }
  ],
  insuranceInfo: [
    {
      name: "insurance_name",
      id: "insurance_name",
      label: "Plan Name",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "insurance_group",
      id: "insurance_group",
      label: "Group Number",
      baseType: "input",
      type: "text",
      options: []
    },
    {
      name: "insurance_member",
      id: "insurance_member",
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
      name: "medical_note",
      id: "medical_note",
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
