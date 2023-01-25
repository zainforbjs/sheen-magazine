import React, { Dispatch, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import { t } from 'react-native-tailwindcss';
import { ItemUser, ItemUserSignup } from 'types/Account';
import { ReduxActionAuthUserInformation } from 'types/Redux/Account';
import { ReduxStateRoot } from 'types/Redux';
import { ReduxStateLoading } from 'types/Redux/Loading';
import LayoutScrollView from 'components/LayoutScrollView';
import FormControlText from 'components/FormControlText';
import ButtonEclipse from 'components/ButtonEclipse';
import ErrorMessage from 'components/ErrorMessage';
import Loading from 'components/Loading';
import { MapStateToPropsLoading } from 'redux/utilities';
import { validationRulesUserInformation } from 'features/Account/utilities';
import { h } from 'styles/size';
import {
  txtInputRoundCorner,
  dropdownStyle,
  txtSelectRoundCorner,
  txtLabelStyle,
  dropDownTextStyle,
  txtLabelStyles
} from 'styles/text';
import { ActionSignUp } from 'redux/actions/account';
import DatePicker from 'react-native-date-picker';

type Props = {
  screenTitle?: string;
  defaultValues?: ItemUser;
  actionText: string;
  hidePassword?: boolean;
  Action?: (
    payload: ItemUser,
    callback: () => void
  ) => ReduxActionAuthUserInformation;
  callback?: () => void;
  navigation: any;
  handleExeption?: () => void;
  children?: React.ReactNode;
};

const FormUserDetails: React.FC<Props> = ({
  defaultValues = {
    fullName: '',
    email: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    role: 'subscriber',
    password: '',
    dob: ''
  },
  Action,
  callback,
  handleExeption,
  navigation,
  screenTitle,
  actionText,
  hidePassword = false,
  children
}: Props) => {
  const { isLoading } = useSelector<ReduxStateRoot, ReduxStateLoading>(
    MapStateToPropsLoading
  );
  const dispatch: Dispatch<ReduxActionAuthUserInformation> =
    useDispatch<Dispatch<ReduxActionAuthUserInformation>>();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ItemUser>({ defaultValues });
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);
  return (
    <>
      <LayoutScrollView screenTitle={screenTitle}>
        {children}
        <Text style={[txtLabelStyle]}>Full Name*</Text>
        <FormControlText
          control={control}
          rules={validationRulesUserInformation.fullName}
          name="fullName"
          placeholder=""
          textStyle={txtInputRoundCorner}
          errors={errors}
        />
        <Text style={[txtLabelStyle]}>Email Address*</Text>
        <FormControlText
          control={control}
          rules={validationRulesUserInformation.email}
          name="email"
          placeholder=""
          textStyle={txtInputRoundCorner}
          errors={errors}
        />

        {!hidePassword && (
          <View>
            <Text style={[txtLabelStyle]}>Password*</Text>
            <FormControlText
              control={control}
              rules={validationRulesUserInformation.password}
              name="password"
              placeholder=""
              textStyle={txtInputRoundCorner}
              errors={errors}
              secureTextEntry
            />
          </View>
        )}

        <View style={[t.mT2]}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Text style={[txtLabelStyles]}>Gender</Text>
                <Dropdown
                  style={txtInputRoundCorner}
                  containerStyle={dropdownStyle}
                  data={[
                    { label: 'Male', value: 'M' },
                    { label: 'Female', value: 'F' }
                  ]}
                  maxHeight={120}
                  labelField="label"
                  onBlur={onBlur}
                  valueField="value"
                  placeholder={''}
                  selectedTextStyle={dropDownTextStyle}
                  placeholderStyle={dropDownTextStyle}
                  value={value}
                  onChange={item => onChange(item?.value)}
                />
              </View>
            )}
            name="gender"
          />
          <ErrorMessage errors={errors} name="gender" />
        </View>
        <View style={[t.mT2]}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <Text style={[txtLabelStyles]}>DOB</Text>
                <TouchableOpacity
                  style={[
                    txtInputRoundCorner,
                    {
                      justifyContent: 'center'
                    }
                  ]}
                  onPress={() => setIsDatePickerShow(true)}
                >
                  <Text>
                    {value ? new Date(value)?.toLocaleDateString() : ''}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="date"
                  open={isDatePickerShow}
                  date={new Date(value ? value : new Date())}
                  onConfirm={date => {
                    setIsDatePickerShow(false);
                    onChange(date);
                  }}
                  onCancel={() => {
                    setIsDatePickerShow(false);
                  }}
                />
              </View>
            )}
            name="dob"
          />
          <ErrorMessage errors={errors} name="dob" />
        </View>

        <View style={[t.mT2]}>
          <Text style={[txtLabelStyle]}>Address</Text>
          <FormControlText
            control={control}
            name="address"
            placeholder=""
            textStyle={txtInputRoundCorner}
          />
        </View>

        <View style={[t.flex, t.justifyBetween, t.flexRow, t.mT2]}>
          <FormControlText
            viewStyle={[t.mT2, t.w1_3, t.mR3]}
            control={control}
            name="city"
            placeholder=""
            inlineLabel={true}
            labelText="City"
            textStyle={txtInputRoundCorner}
            errors={errors}
          />

          <View style={[t.mT2, t.w1_3]}>
            <Text style={[txtLabelStyles]}>State</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  style={txtInputRoundCorner}
                  containerStyle={dropdownStyle}
                  data={[
                    { label: 'Alabama', value: 'AL' },
                    { label: 'Alaska', value: 'AK' },
                    { label: 'Arizona', value: 'AZ' },
                    { label: 'Arkansas', value: 'AR' },
                    { label: 'California', value: 'CA' },
                    { label: 'Colorado', value: 'CO' },
                    { label: 'Connecticut', value: 'CT' },
                    { label: 'Delaware', value: 'DE' },
                    { label: 'District Of Columbia', value: 'DC' },
                    { label: 'Florida', value: 'FL' },
                    { label: 'Georgia', value: 'GA' },
                    { label: 'Hawaii', value: 'HI' },
                    { label: 'Idaho', value: 'ID' },
                    { label: 'Illinois', value: 'IL' },
                    { label: 'Indiana', value: 'IN' },
                    { label: 'Iowa', value: 'IA' },
                    { label: 'Kansas', value: 'KS' },
                    { label: 'Kentucky', value: 'KY' },
                    { label: 'Louisiana', value: 'LA' },
                    { label: 'Maine', value: 'ME' },
                    { label: 'Maryland', value: 'MD' },
                    { label: 'Massachusetts', value: 'MA' },
                    { label: 'Michigan', value: 'MI' },
                    { label: 'Minnesota', value: 'MN' },
                    { label: 'Mississippi', value: 'MS' },
                    { label: 'Missouri', value: 'MO' },
                    { label: 'Montana', value: 'MT' },
                    { label: 'Nebraska', value: 'NE' },
                    { label: 'Nevada', value: 'NV' },
                    { label: 'New Hampshire', value: 'NH' },
                    { label: 'New Jersey', value: 'NJ' },
                    { label: 'New Mexico', value: 'NM' },
                    { label: 'New York', value: 'NY' },
                    { label: 'North Carolina', value: 'NC' },
                    { label: 'North Dakota', value: 'ND' },
                    { label: 'Ohio', value: 'OH' },
                    { label: 'Oklahoma', value: 'OK' },
                    { label: 'Oregon', value: 'OR' },
                    { label: 'Pennsylvania', value: 'PA' },
                    { label: 'Rhode Island', value: 'RI' },
                    { label: 'South Carolina', value: 'SC' },
                    { label: 'South Dakota', value: 'SD' },
                    { label: 'Tennessee', value: 'TN' },
                    { label: 'Texas', value: 'TX' },
                    { label: 'Utah', value: 'UT' },
                    { label: 'Vermont', value: 'VT' },
                    { label: 'Virginia', value: 'VA' },
                    { label: 'Washington', value: 'WA' },
                    { label: 'West Virginia', value: 'WV' },
                    { label: 'Wisconsin', value: 'WI' },
                    { label: 'Wyoming', value: 'WY' }
                  ]}
                  maxHeight={150}
                  labelField="value"
                  selectedTextStyle={dropDownTextStyle}
                  placeholderStyle={dropDownTextStyle}
                  onBlur={onBlur}
                  valueField="value"
                  placeholder={'State'}
                  value={value}
                  onChange={item => onChange(item?.value)}
                />
              )}
              name="state"
            />
            <ErrorMessage errors={errors} name="state" />
          </View>
          <FormControlText
            viewStyle={[t.mT2, t.w1_4]}
            control={control}
            labelText="ZIP"
            inlineLabel={true}
            name="zipCode"
            placeholder=""
            textStyle={txtInputRoundCorner}
            errors={errors}
          />
        </View>

        <View style={[t.mT10]}>
          <View style={[t.flex, t.justifyStart, t.flexRow, t.mT3]}>
            <ButtonEclipse
              text={actionText}
              style={[h(54)]}
              //   onPress={()=>  navigation.navigate('Subscribe')  }
              onPress={handleSubmit((data: ItemUserSignup) =>
                dispatch(
                  ActionSignUp({
                    ...data,
                    state: data?.state ? data.state : 'NY'
                  })
                )
              )}
            />
          </View>
        </View>
      </LayoutScrollView>
      {isLoading && <Loading />}
    </>
  );
};

export default FormUserDetails;
