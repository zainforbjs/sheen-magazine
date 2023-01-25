import { RegisterOptions } from 'react-hook-form';
import { InputResetPassword, ItemUser } from 'types/Account';

type ValidationRulesUserInformation = {
  fullName: RegisterOptions<ItemUser, 'fullName'>;
  email: RegisterOptions<ItemUser, 'email'>;
  password: RegisterOptions<ItemUser, 'password'>;
  gender: RegisterOptions<ItemUser, 'gender'>;
  state: RegisterOptions<ItemUser, 'state'>;
  city: RegisterOptions<ItemUser, 'city'>;
  zipCode: RegisterOptions<ItemUser, 'zipCode'>;
};

type ValidationRulesResetPassword = {
  email: RegisterOptions<ItemUser, 'email'>;
  code: RegisterOptions<InputResetPassword, 'code'>;
  password: RegisterOptions<InputResetPassword, 'password'>;
};

const IsEmail = (value?: string): boolean =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value ?? ''
  );
const IsPasswordValid = (value?: string): boolean => {
  if (!value) {
    return false;
  }
  if (value.length < 8) {
    return false;
  }

  let upperCaseCharacterExist: boolean = false;
  let lowerCaseCharacterExist: boolean = false;
  let numberCharacterExist: boolean = false;
  let specialCharacterExist: boolean = false;

  const charCodeAUppercase: number = 'A'.charCodeAt(0);
  const charCodeZUppercase: number = 'Z'.charCodeAt(0);
  const charCodeALowercase: number = 'a'.charCodeAt(0);
  const charCodeZLowercase: number = 'z'.charCodeAt(0);

  const charCode0: number = '0'.charCodeAt(0);
  const charCode9: number = '9'.charCodeAt(0);

  for (let index = 0; index < value.length; index++) {
    const charCode: number = value.charCodeAt(index);
    if (charCode >= charCodeALowercase && charCode <= charCodeZLowercase) {
      lowerCaseCharacterExist = true;
    } else if (
      charCode >= charCodeAUppercase &&
      charCode <= charCodeZUppercase
    ) {
      upperCaseCharacterExist = true;
    } else if (charCode >= charCode0 && charCode <= charCode9) {
      numberCharacterExist = true;
    } else {
      specialCharacterExist = true;
    }

    if (
      ![
        upperCaseCharacterExist,
        lowerCaseCharacterExist,
        numberCharacterExist,
        specialCharacterExist
      ].includes(false)
    ) {
      return true;
    }
  }

  return false;
};

const emailRule: RegisterOptions<ItemUser, 'email'> = {
  required: {
    value: true,
    message: 'Email is required'
  },
  validate: {
    email: (value: string | undefined): boolean | string =>
      IsEmail(value) || 'Must provide a existing and valid email'
  }
};

export const validationRulesUserInformation: ValidationRulesUserInformation = {
  fullName: {
    required: 'You must specify your full name'
  },
  email: emailRule,
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    validate: {
      password: (value: string | undefined): boolean | string =>
        IsPasswordValid(value) ||
        'Password must be at least 8 character and contain at least one uppercase, one lower case, one special character.'
    }
  },
  gender: {
    required: 'You must specify Gender'
  },
  state: {
    required: 'You must specify a state'
  },
  city: {
    required: 'You must specify a city',
    maxLength: 100
  },
  zipCode: {
    required: 'You must specify a ZipCode',
    validate: {
      zipCode: (value: string | undefined): boolean | string =>
        value?.length === 5 ||
        'Invalid Zip Code! It should be 5 character long.'
    }
  }
};

export const validationRulesResetPassword: ValidationRulesResetPassword = {
  email: emailRule,
  code: {
    required: 'JWT Code is required'
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    validate: {
      password: (value: string | undefined): boolean | string =>
        IsPasswordValid(value) ||
        'Password must be at least 8 character and contain at least one uppercase, one lower case, one special character.'
    }
  }
};
