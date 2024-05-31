const getEmployeeInfo = (obj, key) => {
  key_not_exists_text = "Key does not exists";

  if ((typeof obj !== "object" && !Array.isArray(obj)) || !obj) {
    // check if the "obj" is object or array
    return key_not_exists_text;
  } else if (obj.hasOwnProperty(key)) {
    // if there is a key on first level => return it
    return obj[key];
  } else if (Array.isArray(obj)) {
    // treat array of length = 2 as key-value pair
    if (obj.length === 2) {
      // if there is a key in first element => return second element
      if (obj[0] === key) {
        return obj[1];
      }
    }

    // check recursively array elements
    for (let i = 0; i < obj.length; i++) {
      const result = getEmployeeInfo(obj[i], key);
      if (result !== key_not_exists_text) {
        return result;
      }
    }
  } else {
    // check recursively object elements
    for (const k in obj) {
      const result = getEmployeeInfo(obj[k], key);
      if (result !== key_not_exists_text) {
        return result;
      }
    }
  }

  return key_not_exists_text;
};

const employee = [
  {
    personalInfo: [
      ["firstName", "John"],
      ["lastName", "Doe"],
      ["age", 30],
      [
        "address",
        [
          ["city", "Anytown"],
          ["state", "NY"],
          ["postalCode", "12345"],
        ],
      ],
    ],
  },
  {
    employmentDetails: [
      ["position", "Software Engineer"],
      ["department", "Engineering"],
      ["startDate", "2022-01-01"],
      ["endDate", null],
      [
        "manager",
        [
          ["firstName", "Alice"],
          ["lastName", "Smith"],
          ["email", "alice@example.com"],
        ],
      ],
    ],
  },
];

console.log(getEmployeeInfo(employee, "firstName")); // Should return: "John"
console.log(getEmployeeInfo(employee, "lastName")); // Should return: "Doe"
console.log(getEmployeeInfo(employee, "position")); // Should return: "Software Engineer"
console.log(getEmployeeInfo(employee, "street")); // Should return: "123 Main St"
