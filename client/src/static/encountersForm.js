export const EncountersFormFields = [
  {
    name: 'title',
    id: 'title',
    label: 'Title',
    baseType: 'input',
    type: 'text',
    options: [],
  },
  {
    name: 'type',
    id: 'type',
    label: 'Type',
    baseType: 'select',
    type: null,
    options: [
      {
        label: 'Fees',
        value: 'fees'
      },
      {
        label: 'Advance',
        value: 'advance'
      }
    ],
  },
  {
    name: 'dob',
    id: 'dob',
    label: 'Date',
    baseType: 'input',
    type: 'date',
    options: [],
  }
]

export const EncountersCards = [
  {
    title: "Diagnose",
    showActions: false,
    showSearch: false,
    data: [],
    primaryButtonText: "",
    secondaryButtonText: "",
    icon: null,
  },
  {
    title: "Plan",
    showActions: false,
    showSearch: false,
    data: [],
    primaryButtonText: "",
    secondaryButtonText: "",
    icon: "AddIcon",
  },
  {
    title: "Billing",
    showActions: false,
    showSearch: false,
    data: [],
    primaryButtonText: "",
    secondaryButtonText: "",
    icon: "AddIcon",
  },
]

