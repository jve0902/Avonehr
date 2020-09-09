export const BasicInfoForm = [
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
]