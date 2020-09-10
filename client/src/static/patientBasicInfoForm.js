export const BasicInfoForm = {
    firstRow: [
      {
        name: 'firstName',
        id: 'firstName',
        label: 'First Name',
        baseType: 'input',
        type: 'text',
        options: [],
      },
      {
        name: 'middleName',
        id: 'middleName',
        label: 'Middle Name',
        baseType: 'input',
        type: 'text',
        options: [],
      },
      {
        name: 'lastName',
        id: 'lastName',
        label: 'Last Name',
        baseType: 'input',
        type: 'text',
        options: [],
      },
      {
        name: 'status',
        id: 'status',
        label: 'Status',
        baseType: 'select',
        type: null,
        options: [
          {
            label: 'Active',
            value: 'active'
          },
          {
            label: 'In-Active',
            value: 'inActive'
          }
        ],
      },
      {
        name: 'provider',
        id: 'provider',
        label: 'Provider',
        baseType: 'select',
        type: null,
        options: [
          {
            label: 'Active',
            value: 'active'
          },
          {
            label: 'In-Active',
            value: 'inActive'
          }
        ],
      },
    ],
    secondRow: [
      {
        name: 'homePhone',
        id: 'homePhone',
        label: 'Home Phone',
        baseType: 'input',
        type: 'number',
        options: [],
      },
      {
        name: 'cellPhone',
        id: 'cellPhone',
        label: 'Cell Phone',
        baseType: 'input',
        type: 'number',
        options: [],
    },
    {
      name: 'workPhone',
      id: 'workPhone',
      label: 'Work Phone',
      baseType: 'input',
      type: 'number',
      options: [],
    },
    {
      name: 'email',
      id: 'email',
      label: 'Email',
      baseType: 'input',
      type: 'email',
      options: [],
    },
    {
      name: 'dob',
      id: 'dob',
      label: '  ',
      baseType: 'input',
      type: 'date',
      options: [],
    },
  ],
  thirdRow: [
    {
      name: 'otherPhone',
      id: 'otherPhone',
      label: 'Other Phone',
      baseType: 'input',
      type: 'number',
      options: [],
    },
    {
      name: 'phoneNotes',
      id: 'phoneNotes',
      label: 'Phone Notes',
      baseType: 'input',
      type: 'number',
      options: [],
    },
    {
      name: 'gender',
      id: 'gender',
      label: 'Gender',
      baseType: 'select',
      type: null,
      options: [
        {
          label: 'Male',
          value: 'male'
        },
        {
          label: 'Female',
          value: 'female'
        }
      ],
    },
    {
      name: 'socialSecurity',
      id: 'socialSecurity',
      label: 'Social Security',
      baseType: 'input',
      type: 'text',
      options: [],
    },
  ]
}

export const InsuranceForm = [
    {
      name: 'planName',
      id: 'planName',
      label: 'Plan Name',
      baseType: 'input',
      type: 'text',
      options: [],
    },
    {
      name: 'groupName',
      id: 'groupName',
      label: 'Group Name',
      baseType: 'input',
      type: 'text',
      options: [],
    },
    {
      name: 'memberId',
      id: 'memberId',
      label: 'Member Id',
      baseType: 'input',
      type: 'number',
      options: [],
    },
    {
      name: 'planPhoneNo',
      id: 'planPhoneNo',
      label: 'Plan Phone No',
      baseType: 'input',
      type: 'number',
      options: [],
    },
    {
      name: 'planDescription',
      id: 'planDescription',
      label: 'Plan Description',
      baseType: 'input',
      type: 'text',
      options: [],
    },
  ]

  export const AddressForm = [
    {
      name: 'city',
      id: 'planName',
      label: 'Plan Name',
      baseType: 'input',
      type: 'text',
      options: [],
    },
    {
      name: 'state',
      id: 'planName',
      label: 'Plan Name',
      baseType: 'input',
      type: 'text',
      options: [],
    },
    {
      name: 'zip/postal',
      id: 'planName',
      label: 'Plan Name',
      baseType: 'input',
      type: 'text',
      options: [],
    },
  ]

  export const Pharmacies = [
    {
      name: 'Pharmacy 1',
      address: '100 Main St, Ottario Canada',
      phone: '030-123-456',
    },
    {
      name: 'Pharmacy 2',
      address: '100 Main St, New York USA',
      phone: '030-123-456',
    },
  ]

  export const PaymentData = [
    {
      type: 'Visa',
      lastFour: 1234,
      expires: '31-10-2020',
    },
    {
      type: 'Master Card',
      lastFour: 4321,
      expires: '20-9-2020',
    },
  ] 