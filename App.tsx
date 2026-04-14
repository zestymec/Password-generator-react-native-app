import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native'

import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number().min(2, 'should be min 2').max(8, 'should be less than 8').required('length is required')
})

export default function App() {
  const [password, setPassword] = useState('')
  const [ispassgenerated, setIspassgenerated] = useState(false)
  const [lowercase, setlowercase] = useState(true)
  const [Uppercase, setUppercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatepasswordString = (passwordlength: number) => {
    let characterlist = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';


    if (Uppercase) {
      characterlist += upperCaseChars;
    }
    if (lowercase) {
      characterlist += lowerCaseChars;
    }
    if (numbers) {
      characterlist += digitChars;
    }
    if (symbols) {
      characterlist += specialChars;
    }

    const passwordResult = createPasswords(characterlist, passwordlength)
    setPassword(passwordResult)
    setIspassgenerated(true)
  }

  const createPasswords = (chracters: string, passwordlength: number) => {
    let result = ''
    for (let i = 0; i < passwordlength; i++) {

      const chracterIndex = Math.round(Math.random() * chracters.length)
      result += chracters.charAt(chracterIndex)
    }
    return result
  }

  const resetPasswords = () => {
    setPassword('')
    setIspassgenerated(false)
    setNumbers(false)
    setlowercase(true)
    setSymbols(false)
    setlowercase(true)

  }

  return (<SafeAreaView style={styles.appContainer}>
    <ScrollView keyboardShouldPersistTaps='handled'>

      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Password Generator
        </Text>
        <Formik
          initialValues={{ passwordLength: '' }}
          validationSchema={passwordSchema}
          onSubmit={values => {
            console.log(values)
            generatepasswordString(+values.passwordLength)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            isValid,
            handleSubmit,
            handleReset,
            /* and other goodies */
          }) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  <TextInput
    style={styles.inputStyle}
    value={values.passwordLength}
    onChangeText={handleChange('passwordLength')}
    placeholder="Ex. 8"
    keyboardType="numeric"
  />
  {touched.passwordLength && errors.passwordLength && (
    <Text style={styles.errorText}>{errors.passwordLength}</Text>
  )}
                </View></View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.formActions}>
                <TouchableOpacity>
                  <Text>Generate Password</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
});