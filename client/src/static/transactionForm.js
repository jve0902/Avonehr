export const TransactionFormFields = [
    {
      name: 'dob',
      id: 'dob',
      label: 'Date',
      baseType: 'input',
      type: 'date',
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
      name: 'amount',
      id: 'amount',
      label: 'Amount',
      baseType: 'input',
      type: 'number',
      options: [],
    },
    {
      name: 'accountNum',
      id: 'accountNum',
      label: 'Account Number',
      baseType: 'input',
      type: 'number',
      options: [],
    },
    {
      name: 'paymentType',
      id: 'paymentType',
      label: 'Payment Type',
      baseType: 'select',
      type: null,
      options: [
        {
          label: 'Advance',
          value: 'advance'
        },
        {
          label: 'Credit',
          value: 'credit'
        }
      ],
    },
  ]